import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wedding-game',
  imports: [CommonModule],
  templateUrl: './wedding-game.html',
  styleUrl: './wedding-game.scss',
})
export class WeddingGame implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  score = signal(0);
  isGameOver = signal(false);
  isPlaying = signal(false);
  highScore = signal(0);

  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  
  // Physik
  private gravity = 0.2;
  private jumpStrength = -10;
  private speed = 2;
  
  // Bilder
  private playerSprite = new Image(); // Umbenannt, da es jetzt ein Sheet ist
  private obstacleImage = new Image();
  private imagesLoaded = 0;

  // --- ANIMATION KONFIGURATION ---
  private frameIndex = 0;       // Welches Bild zeigen wir gerade? (0, 1 oder 2)
  private frameTimer = 0;       // Zähler für die Geschwindigkeit der Animation
  private animationSpeed = 30;  // Je kleiner, desto schneller zappeln die Beine
  // WICHTIG: Hier musst du evtl. anpassen, wie breit EIN Frame in deinem Bild ist
  // Wenn dein ganzes Bild 150px breit ist und 3 Figuren hat -> 50px pro Frame.
  private spriteWidth = 155;     
  private spriteHeight = 150;    
  // ------------------------------

  private player = {
    x: 50,
    y: 200,
    width: 70,   // Größe im Spiel (angezeigt)
    height: 50,
    velocity: 0,
    isJumping: false
  };

  private obstacles: any[] = [];
  private obstacleTimer = 0;

  constructor() {
    // Lade das neue Sprite Sheet
    this.playerSprite.src = 'assets/img/animationen3.png';
    this.playerSprite.onload = () => {
        this.imagesLoaded++;
        // Optional: Breite automatisch erkennen (durch 3 geteilt)
        // this.spriteWidth = this.playerSprite.width / 3;
        // this.spriteHeight = this.playerSprite.height;
    };

    this.obstacleImage.src = 'assets/img/obstacles2.png';
    this.obstacleImage.onload = () => this.imagesLoaded++;
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    
    const waitForImages = () => {
      if (this.imagesLoaded === 2) {
        this.draw(); 
      } else {
        requestAnimationFrame(waitForImages);
      }
    };
    waitForImages();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }

  startGame() {
    if (this.imagesLoaded < 2) return;

    this.isGameOver.set(false);
    this.isPlaying.set(true);
    this.score.set(0);
    this.obstacles = [];
    this.speed = 2;
    this.player.y = this.canvasRef.nativeElement.height - this.player.height;
    this.gameLoop();
  }

  private gameLoop() {
    if (this.isGameOver()) return;
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  private update() {
    // 1. Spieler Physik
    this.player.velocity += this.gravity;
    this.player.y += this.player.velocity;

    const floor = this.canvasRef.nativeElement.height - this.player.height;
    
    // Boden-Logik
    if (this.player.y > floor) {
      this.player.y = floor;
      this.player.velocity = 0;
      this.player.isJumping = false;
    }

    // --- ANIMATION LOGIK ---
    if (this.player.isJumping) {
      // Wenn wir springen, zeigen wir Frame 2 (den Sprung-Frame)
      this.frameIndex = 2; 
    } else {
      // Wenn wir laufen, wechseln wir zwischen Frame 0 und 1
      this.frameTimer++;
      if (this.frameTimer > this.animationSpeed) {
        // Toggle zwischen 0 und 1
        this.frameIndex = (this.frameIndex === 0) ? 1 : 0;
        this.frameTimer = 0;
      }
    }
    // -----------------------

    // 2. Hindernisse spawnen
    this.obstacleTimer++;
    if (this.obstacleTimer > Math.random() * 100000 + 60) {
      const obsHeight = Math.random() * 30 + 40; 
      const obsWidth = obsHeight * 0.8;

      this.obstacles.push({
        x: this.canvasRef.nativeElement.width,
        y: floor + this.player.height - obsHeight,
        width: obsWidth,
        height: obsHeight
      });
      this.obstacleTimer = 0;
    }

    // 3. Hindernisse bewegen & Kollision
    this.obstacles.forEach((obs, index) => {
      obs.x -= this.speed;

      // Hitbox Buffer
      const hitboxBuffer = 10; 
      if (
        this.player.x + hitboxBuffer < obs.x + obs.width - hitboxBuffer &&
        this.player.x + this.player.width - hitboxBuffer > obs.x + hitboxBuffer &&
        this.player.y + hitboxBuffer < obs.y + obs.height - hitboxBuffer &&
        this.player.y + this.player.height - hitboxBuffer > obs.y + hitboxBuffer
      ) {
        this.gameOver();
      }

      if (obs.x + obs.width < 0) {
        this.obstacles.splice(index, 1);
        this.score.update(s => s + 1);
        if (this.score() % 5 === 0) this.speed += 0.3; 
      }
    });
  }

  private draw() {
    const width = this.canvasRef.nativeElement.width;
    const height = this.canvasRef.nativeElement.height;

    this.ctx.clearRect(0, 0, width, height);

    // --- SPIELER ZEICHNEN (MIT SPRITE AUSSCHNITT) ---
    // Wir berechnen: Wo im Originalbild fängt der aktuelle Frame an?
    // sx = Source X (FrameIndex * Breite eines Frames)
    const sx = this.frameIndex * this.spriteWidth; 
    
    this.ctx.drawImage(
      this.playerSprite, // Das Bild
      sx, 0,             // Startpunkt im Bild (X variiert, Y ist 0)
      this.spriteWidth, this.spriteHeight, // Wie viel schneiden wir aus?
      this.player.x, this.player.y,        // Wo hin damit auf dem Canvas?
      this.player.width, this.player.height // Wie groß soll es dargestellt werden?
    );
    // ------------------------------------------------

    // Hindernisse zeichnen
    this.obstacles.forEach(obs => {
      this.ctx.drawImage(this.obstacleImage, obs.x, obs.y, obs.width, obs.height);
    });

    // Bodenlinie
    this.ctx.beginPath();
    this.ctx.moveTo(0, height);
    this.ctx.lineTo(width, height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#49463E';
    this.ctx.stroke();
  }

  jump() {
    if (!this.player.isJumping && this.isPlaying() && !this.isGameOver()) {
      this.player.velocity = this.jumpStrength;
      this.player.isJumping = true;
    } else if (this.isGameOver()) {
      this.startGame();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space' && this.isPlaying()) {
      event.preventDefault(); 
      this.jump();
    }
  }

  @HostListener('touchstart', ['$event'])
  handleTouch(event: TouchEvent) {
     if(this.isPlaying()) {
         event.preventDefault();
         this.jump();
     }
  }

  private gameOver() {
    this.isGameOver.set(true);
    this.isPlaying.set(false);
    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
    }
  }

  private resizeCanvas() {
    const parent = this.canvasRef.nativeElement.parentElement;
    if (parent) {
      this.canvasRef.nativeElement.width = parent.clientWidth;
      this.canvasRef.nativeElement.height = 300;
    }
  }
}
