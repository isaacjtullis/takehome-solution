# AI Script Builder - Technical Solution

## Overview
Hey everyone! I'm excited to submit this project to the Hatch team. 
Below is an outline for running the application locally and kicking off the test suite.


## Summary
This project implements a rich text editor with markdown support, featuring interactive function badges and slash commands. The solution prioritizes user experience while maintaining clean, maintainable code.

## Tech Stack & Architecture

### Core Technologies
- **React + TypeScript**: For type-safe, component-based UI development
- **TipTap**: A headless editor framework providing extensible rich text editing
- **TailwindCSS**: For utility-first styling
- **shadcn/ui**: For accessible, customizable UI components

### Key Features
- Rich text editing with markdown support
- Interactive function badges with keyboard navigation
- Slash command menu for quick actions
- Bidirectional markdown conversion
- Responsive and accessible UI

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

4. **Run tests:** 
   ```sh
   npm run test
   ```

## Implementation Details

### What's Working
- ✅ **Rich Markdown Rendering:** Full support for headings, lists, code blocks, and blockquotes
- ✅ **Function Badges:** Interactive badges with tooltips, dropdown selection, and deletion
- ✅ **Slash Commands:** Keyboard-accessible command menu with function insertion
- ✅ **Round-trip Markdown:** Preserves formatting and badges through serialization
- ✅ **Mode Switching:** Seamless toggle between markdown and rich text editing

### Areas for Improvement
- **Live Markdown Preview:** Could add a split view for real-time markdown rendering
- **Performance Optimization:** Further optimization for large documents
- **Error Handling:** More robust error states and user feedback
- **UI Enhancements:** Replace confirmation dialogs with modal dialogs
- **Placeholder Text:** Add visual indicators for selected block types

## Trade-offs & Decisions

1. **TipTap vs ProseMirror:**
   - Chose TipTap for its React integration and extension system
   - Trade-off: Less direct control over the editor core. A level of abstraction. 
   - **Alternative Editors Considered:**
      - Looked into Slate and Lexical but ultimately went with TipTap.
      - https://www.reddit.com/r/reactjs/comments/1i7rp5d/slatejs_vs_lexical_vs_anything_else/
      - https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025
      - https://news.ycombinator.com/item?id=31814983

## Future Enhancements

1. **Performance:**
   - Implement virtual scrolling for large documents
   - Add code splitting for better load times

2. **Features:**
   - Add collaborative editing support
   - Implement custom function badge types
   - Add more keyboard shortcuts

3. **Developer Experience:**
   - Add more comprehensive testing
   - Improve documentation
   - Add storybook for component development

---

*Thank you for reviewing my solution. I'm excited to discuss the implementation!* 