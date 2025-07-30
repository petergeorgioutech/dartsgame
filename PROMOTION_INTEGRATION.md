# Darts Promotion Integration Guide

## Overview
The darts game has been modified to support a win/lose promotion system where users play a simplified darts game that's rigged to either always hit the bullseye (win) or always miss it (lose).

## How It Works

### Win Scenario
- User clicks anywhere on screen
- Dart automatically hits the bullseye
- Shows "BULLSEYE! YOU WIN!" modal
- Dispatches `promotion_win_complete` event

### Lose Scenario  
- User clicks anywhere on screen
- Dart hits random non-bullseye area
- Shows "NICE TRY! BETTER LUCK NEXT TIME!" modal
- Dispatches `promotion_lose_complete` event

## Integration Methods

### Method 1: URL Parameters (Recommended)
```
index.html?promotion_result=win   // For win scenario
index.html?promotion_result=lose  // For lose scenario
```

### Method 2: JavaScript Configuration
```javascript
// In settings.js or before game initialization
PROMOTION_MODE = true;
PROMOTION_RESULT = MODE_PROMOTION_WIN;  // or MODE_PROMOTION_LOSE
```

### Method 3: Direct API Call
```javascript
// After game is loaded
s_oMain.gotoPromotionGame(MODE_PROMOTION_WIN);  // or MODE_PROMOTION_LOSE
```

### Method 4: Data Attributes (Recommended for Custom Text)
```html
<canvas id="canvas" 
    data-promotion-mode="true"
    data-promotion-result="win"
    data-promotion-instructions-title="Welcome to our promotion!&#10;&#10;Aim for the bullseye to win!&#10;&#10;Click anywhere to throw!"
    data-promotion-instructions-button-text="Let's Play!">
</canvas>
```

## Event Handling

Listen for completion events to integrate with your promotion flow:

```javascript
// For win scenario
document.addEventListener("promotion_win_complete", function() {
    // User won - show your win page/content
    console.log("User won the promotion!");
    // Your code here...
});

// For lose scenario  
document.addEventListener("promotion_lose_complete", function() {
    // User lost - show your lose page/content
    console.log("User lost the promotion!");
    // Your code here...
});
```

## Customizing Instruction Text

You can customize the instruction text that appears in the introduction modal:

### Method 1: Data Attributes (Recommended)
```html
<canvas id="canvas" 
    data-promotion-mode="true"
    data-promotion-result="win"
    data-promotion-instructions-title="Welcome to our promotion!&#10;&#10;Aim for the bullseye to win!&#10;&#10;Click anywhere to throw!"
    data-promotion-instructions-button-text="Let's Play!">
</canvas>
```

### Method 2: JavaScript Variables
```javascript
// Set before game initialization
PROMOTION_INSTRUCTIONS_TITLE = "Welcome to our promotion!\n\nAim for the bullseye to win!\n\nClick anywhere to throw!";
PROMOTION_INSTRUCTIONS_BUTTON_TEXT = "Let's Play!";
```

### Method 3: Programmatic Control
```javascript
// After game is loaded
setPromotionMode(true, 'win', 
    "Welcome to our promotion!\n\nAim for the bullseye to win!\n\nClick anywhere to throw!", 
    "Let's Play!"
);
```

**Note:** Use `&#10;` for line breaks in HTML data attributes, or `\n` in JavaScript strings.

## Complete Integration Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Promotion</title>
</head>
<body>
    <!-- Your promotion form/entry page -->
    <div id="promotion-form">
        <h1>Enter Our Promotion!</h1>
        <form id="entry-form">
            <input type="text" placeholder="Name" required>
            <input type="email" placeholder="Email" required>
            <button type="submit">Enter Now!</button>
        </form>
    </div>

    <!-- Hidden game container -->
    <div id="game-container" style="display: none;">
        <!-- Darts game will be loaded here -->
    </div>

    <!-- Win page (hidden initially) -->
    <div id="win-page" style="display: none;">
        <h1>🎉 CONGRATULATIONS! 🎉</h1>
        <p>You've won our amazing prize!</p>
        <!-- Your win content -->
    </div>

    <!-- Lose page (hidden initially) -->
    <div id="lose-page" style="display: none;">
        <h1>Thanks for Playing!</h1>
        <p>Better luck next time!</p>
        <!-- Your lose content -->
    </div>

    <script>
        // Handle form submission
        document.getElementById('entry-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Submit to your backend
            submitToBackend().then(function(response) {
                if (response.winner) {
                    // User won - show darts game with win scenario
                    showDartsGame('win');
                } else {
                    // User lost - show darts game with lose scenario  
                    showDartsGame('lose');
                }
            });
        });

        function showDartsGame(result) {
            // Hide form
            document.getElementById('promotion-form').style.display = 'none';
            
            // Show game container
            document.getElementById('game-container').style.display = 'block';
            
            // Load darts game with result parameter
            var iframe = document.createElement('iframe');
            iframe.src = 'index.html?promotion_result=' + result;
            iframe.style.width = '100%';
            iframe.style.height = '100vh';
            iframe.style.border = 'none';
            document.getElementById('game-container').appendChild(iframe);
        }

        // Listen for game completion events
        window.addEventListener('message', function(event) {
            if (event.data.type === 'promotion_win_complete') {
                showWinPage();
            } else if (event.data.type === 'promotion_lose_complete') {
                showLosePage();
            }
        });

        function showWinPage() {
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('win-page').style.display = 'block';
        }

        function showLosePage() {
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('lose-page').style.display = 'block';
        }

        function submitToBackend() {
            // Your backend submission logic
            return new Promise(function(resolve) {
                // Simulate backend response
                setTimeout(function() {
                    resolve({winner: Math.random() > 0.5}); // 50% chance of winning
                }, 1000);
            });
        }
    </script>
</body>
</html>
```

## Customization Options

### Modify Text
Edit the modal text in:
- `CPromotionWinModal.js` - Win message
- `CPromotionLoseModal.js` - Lose message

### Adjust Timing
Modify in `settings.js`:
```javascript
var PROMOTION_ANIMATION_DURATION = 2000; // Dart animation duration
var PROMOTION_MODAL_DELAY = 1000;        // Delay before showing modal
```

### Change Colors/Styling
Modify the modal appearance in the modal files or add custom CSS.

## Testing

Use the included `demo.html` file to test both scenarios:
1. Open `demo.html` in your browser
2. Click "Test Win Scenario" or "Test Lose Scenario"
3. Click anywhere in the game to throw the dart
4. Watch the animation and modal

## Browser Compatibility

The promotion system works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch and mouse input

## Troubleshooting

### Game doesn't load
- Check that all JavaScript files are properly included
- Verify the URL parameters are correct
- Check browser console for errors

### Events not firing
- Ensure event listeners are added before the game loads
- Check that the game is properly initialized
- Verify the event names match exactly

### Animation issues
- Check that CreateJS is properly loaded
- Verify sprite assets are loading correctly
- Check browser compatibility 