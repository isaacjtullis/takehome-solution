# SOLUTION.md

## Editor Stack Choice and Why

**Stack:**
- **React**: For component-based UI and state management.
- **TypeScript**: For type safety and maintainability.
- **Tiptap**: As the core rich text editor, chosen for its extensibility, ProseMirror foundation, and strong React integration.
- **TailwindCSS**: For rapid, consistent, and utility-first styling.
- **shadcn/ui & Radix**: For accessible, headless UI primitives (popover, tooltip, etc.).

**Why this stack?**
- I was debating between TipTap, Slate and Lexical. I paroused the community to gather some information. These were some articles that helped me gather some information:
- https://www.reddit.com/r/reactjs/comments/1i7rp5d/slatejs_vs_lexical_vs_anything_else/
- https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025
- https://news.ycombinator.com/item?id=31814983

- I ultimately went with TipTap as I found it the easiest to get up and running while still being robust enough for me to complete all of the tasks. 
- I'm concerned that it does have a layer of abstraction (built ontop of ProseMirror) but for this project it is plenty adequate. 
- I did work with Slate and tested out some of it's functionality and was pretty impressed with how easy it was to create my own short cuts and customize how the Markdown worked. Ultimately though, I found that it would require too much time to dive into how it worked with nodes to get a working example. 

---

## Trade-offs Made

- **Tiptap vs. Other Markdown Editors**: Tiptap is heavier than a simple markdown-to-HTML renderer, but it enables rich interactivity (badges, slash commands, etc.). 
- **Custom Extensions**: Writing custom Tiptap extensions (for badges, slash commands) adds complexity, but is necessary for the required features.
- **Mode Switching**: Using a textarea for markdown mode means no live preview, but keeps the implementation simple and clear. 

---

## How to Run the Project Locally

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the dev server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

4. **Run tests:** 
   ```sh
   npm run test
   ```


---

## What's Working and What's Not (Why?)

### What's Working
- ✅ **Rich Markdown Rendering:** Headings, lists, code, blockquotes, etc. render and edit as expected.
- ✅ **Function Badges:** Placeholders are replaced with interactive badges; badges can be changed or deleted via dropdown.
- ✅ **Slash Commands:** Typing `/` in the editor opens a keyboard-accessible command menu.
- ✅ **Round-trip Markdown:** Load → Edit → Serialize → Load again preserves structure and badges.
- ✅ **Mode Switching:** Toggle between markdown editing and rich preview.

### What's Not (or could be improved)
- **Live Markdown Preview:** Markdown mode is plain text only; no live preview side-by-side.
- **Performance:** For very large documents, performance could be further optimized.

---

## Anything I'd Improve With More Time
- **Live Markdown Preview:** Add a split view to show live rendered markdown alongside the textarea.
- **More Customization:** Add more customization for users to define their own slash commands or badge types. 
- **Testing:** Add more unit and integration tests for custom extensions and components.
- **Performance:** Profile and optimize for large documents and complex badge usage.
- **Edge Case Handling:** Some error states (e.g., missing function spec) are handled simply.
- **Deleting Functions:** Should use Shad Dialogs instead of JS confirmation dialogs
- **Toast Message:** After deletion, display a toast message
- **Text Placeholders:** When selecting h1, bullets, paragraphs, it would look better to have a placeholder that displays what is selected on the screen. (This is typical in Notion)
- **Documentation:** Add more inline comments and developer docs for maintainability.

---

**Thank you for reviewing this solution!** 