# Darts Game - Bundled Version

This is a bundled version of the Darts game that can be easily integrated into other projects.

## Files Created

- `bundle.css` - All CSS files combined into one file
- `bundle.js` - All JavaScript files combined into one file
- `template.html` - Example HTML template showing how to use the bundled files

## How to Use in Another Project

### 1. Copy Required Files

Copy these files to your project:
- `bundle.css`
- `bundle.js`
- `sprites/` folder (contains all game images)
- `sounds/` folder (contains all game audio)

### 2. Include in Your HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Project</title>
    
    <!-- Include the bundled CSS -->
    <link rel="stylesheet" href="bundle.css" type="text/css">
    
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
</head>

<body>
    <!-- Canvas for the game -->
    <canvas id="canvas" class='ani_hack' width="1920" height="1920"></canvas>
    
    <!-- Block overlay for pause functionality -->
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

    <!-- Include the bundled JavaScript -->
    <script type="text/javascript" src="bundle.js"></script>
    
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // Initialize the game
            var oMain = new CMain({
                audio_enable_on_startup: false,
                fullscreen: true
            });
            
            // Handle responsive sizing
            if (isIOS()) {
                setTimeout(function () { sizeHandler(); }, 200);
            } else {
                sizeHandler();
            }
        });
    </script>
</body>
</html>
```

### 3. Game Features

The bundled game includes:
- ✅ No splash screen (goes directly to game)
- ✅ No mode selection (starts in single player mode)
- ✅ Full darts gameplay
- ✅ Promotion mode support
- ✅ Mobile responsive
- ✅ Touch controls
- ✅ Audio support

### 4. Promotion Mode

To enable promotion mode, set the canvas attributes:

```html
<canvas id="canvas" 
        class='ani_hack' 
        width="1920" 
        height="1920" 
        data-promotion-mode="true" 
        data-promotion-result="win">
</canvas>
```

And add this JavaScript:

```javascript
var canvas = document.getElementById('canvas');
var promotionMode = canvas.getAttribute('data-promotion-mode');
var promotionResult = canvas.getAttribute('data-promotion-result');

if (promotionMode === 'true') {
    PROMOTION_MODE = true;
    PROMOTION_RESULT = (promotionResult === 'win') ? MODE_PROMOTION_WIN : MODE_PROMOTION_LOSE;
}
```

### 5. Event Listeners

The game fires these events that you can listen to:

```javascript
// Game session events
document.addEventListener("start_session", function (evt) {
    console.log("Game session started");
});

document.addEventListener("end_session", function (evt) {
    console.log("Game session ended");
});

document.addEventListener("save_score", function (evt) {
    console.log("Score saved:", evt.detail.score);
});

// Promotion events
document.addEventListener('promotion_win_result', function () {
    console.log("Promotion win result");
});

document.addEventListener('promotion_lose_result', function () {
    console.log("Promotion lose result");
});
```

### 6. Configuration Options

When initializing the game, you can configure:

```javascript
var oMain = new CMain({
    audio_enable_on_startup: false, // Enable/disable audio on startup
    fullscreen: true                // Show/hide fullscreen button
});
```

### 7. File Structure

Your project should look like this:
```
your-project/
├── index.html
├── bundle.css
├── bundle.js
├── sprites/
│   ├── bg_game.jpg
│   ├── dartboard.png
│   ├── but_play.png
│   └── ... (all other sprite files)
└── sounds/
    ├── click.mp3
    ├── hit.mp3
    ├── soundtrack.mp3
    └── ... (all other sound files)
```

## Notes

- The game is now optimized to start directly without any menu screens
- All dependencies are included in the bundle files
- The game is mobile-responsive and works on touch devices
- Audio is disabled by default but can be enabled
- The game uses the Impact font (included in the CSS bundle)

## Troubleshooting

1. **Game doesn't load**: Make sure all files are in the correct locations
2. **Images don't appear**: Check that the `sprites/` folder is copied correctly
3. **Audio doesn't work**: Ensure the `sounds/` folder is present
4. **Mobile issues**: Make sure the viewport meta tag is included

## Customization

You can modify the game behavior by editing the `bundle.js` file:
- Change default game settings in the `settings.js` section
- Modify game logic in the various game class files
- Adjust styling in the `bundle.css` file 