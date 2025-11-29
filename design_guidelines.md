# CipherVault Design Guidelines

## Design Approach
**System-Based Approach**: Material Design-inspired for productivity tools
- Clean, functional interface prioritizing usability and readability
- Modern minimal aesthetic with purposeful spacing
- Focus on clear visual hierarchy and efficient workflows

## Typography Hierarchy

**Font Stack**: System font stack for optimal performance
- Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- Monospace (for cipher input/output): "Courier New", Consolas, Monaco

**Text Hierarchy**:
- App Title (CipherVault): Large, bold weight
- Page Headings (Cipher names): Medium-large, semi-bold
- Section Labels: Small, uppercase, medium weight, tracking-wide
- Input/Output Text: Monospace, medium size for readability
- Body/Instructions: Regular weight, comfortable reading size
- Footer: Small, regular weight

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-6 or p-8
- Section spacing: space-y-6
- Button spacing: gap-4
- Card margins: m-4 or m-6

**Responsive Grid**:
- Home page cipher cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Maximum container width: max-w-4xl for tool pages, max-w-6xl for home
- Centered layouts with mx-auto

## Component Library

### Home Page
**Hero Section**:
- Centered app title "CipherVault" with tagline
- Brief description (1-2 lines): "Five powerful encryption tools in one place"
- Compact height (not full viewport) - approximately 30-40vh
- No hero image - focus on clean typography

**Cipher Cards Grid**:
- 5 interactive cards in responsive grid
- Each card contains:
  - Icon representation (using Font Awesome icons: fa-key, fa-lock, fa-exchange-alt, fa-binary, fa-undo)
  - Cipher name as heading
  - Brief one-line description
  - Subtle shadow with hover elevation effect
  - Rounded corners (rounded-lg)
  - Click-to-navigate interaction

### Cipher Tool Pages

**Page Structure**:
- Breadcrumb navigation at top (Home > Cipher Name)
- Page title with cipher name
- Brief instruction text
- Control section (varies by cipher)
- Input/output section
- Action buttons row

**Input/Output Section**:
- Two-column layout on desktop (grid-cols-1 lg:grid-cols-2)
- Stack to single column on mobile
- Each column contains:
  - Label ("Input" / "Output")
  - Textarea with monospace font
  - Character/word count indicator below
  - Border and subtle background differentiation

**Control Sections** (cipher-specific):
- Caesar: Slider with number display (0-25) + Auto-decode checkbox
- Vigenère: Keyword text input + dynamic table visualization below
- Atbash: Auto-processing indicator
- Binary: Radio buttons for direction (Text→Binary / Binary→Text)
- Reverse: Radio buttons (Reverse All / Reverse Each Word)

**Action Buttons**:
- Primary row: Encrypt, Decrypt (where applicable)
- Secondary row: Clear, Copy to Clipboard
- Button styling: Medium padding (px-6 py-3), rounded corners
- Visual hierarchy: Primary actions more prominent

**Vigenère Table Visualization**:
- Scrollable container with 26x26 grid
- Compact cell sizing
- Highlight active cells during operation
- Character-by-character breakdown display below table

### Navigation
- Fixed top bar OR floating back button
- Simple, unobtrusive navigation between tools
- Mobile hamburger menu if using top nav

### Footer
- Sticky or standard bottom placement
- Centered text: "Built using Loveable AI"
- Minimal height (py-4)
- Subtle border-top separator

## Animations

**Card Hover Effects**:
- Subtle lift (translateY(-4px))
- Shadow enhancement
- Smooth transition (0.3s ease)

**Button Interactions**:
- Scale on press (scale-95)
- Ripple effect on click
- Smooth state transitions

**Page Transitions**:
- Fade-in for new cipher pages
- Slide transitions optional

**Processing Indicators**:
- Subtle pulse during real-time conversion
- Success checkmark on copy action

## Accessibility
- Proper ARIA labels for all inputs and buttons
- Keyboard navigation support
- Focus states clearly visible
- Sufficient contrast ratios
- Screen reader friendly labels

## Mobile Responsiveness
- Touch-friendly button sizes (minimum 44px height)
- Single column layouts on mobile
- Collapsible sections if needed
- Readable text sizes (minimum 16px for inputs)

## Visual Hierarchy Principles
- Clear separation between input and output zones
- Primary actions (Encrypt/Decrypt) visually prominent
- Secondary actions (Clear/Copy) more subtle
- Consistent spacing creates visual rhythm
- Ample whitespace prevents cognitive overload

## Images
**None required** - This is a utility tool focused on functionality where images would be distracting. The visual interest comes from clean typography, card layouts, and the dynamic cipher table visualization.