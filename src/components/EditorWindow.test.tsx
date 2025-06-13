import { preprocessMarkdown, postprocessMarkdown } from './editorWindowHelpers'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { EditorWindow } from './EditorWindow';

describe('preprocessMarkdown', () => {
  it('replaces function placeholders with function-badge tags', () => {
    const input = 'Hello <% function abc123 %> world';
    const output = preprocessMarkdown(input);
    expect(output).toContain('<function-badge id="abc123"></function-badge>');
  });

  it('does not change text without placeholders', () => {
    const input = 'Just some text';
    expect(preprocessMarkdown(input)).toBe(input);
  });
});

describe('postprocessMarkdown', () => {
  it('replaces function-badge tags with function placeholders', () => {
    const input = '<function-badge id="xyz789"></function-badge>';
    const output = postprocessMarkdown(input);
    expect(output).toContain('<% function xyz789 %>');
  });

  it('does not change text without function-badge tags', () => {
    const input = 'No badges here';
    expect(postprocessMarkdown(input)).toBe(input);
  });
}); 

describe('EditorWindow', () => {
  it('toggles between markdown and preview modes using data-testid', () => {
    render(<EditorWindow />)

    // Should start in preview mode
    expect(screen.getByTestId('markdown-preview-window')).toBeTruthy()
    expect(screen.queryByTestId('markdown-textarea')).toBeNull()

    // Click the toggle button to switch to markdown mode
    fireEvent.click(screen.getByTestId('toggle-markdown-btn'))

    // Now textarea should be present, preview should be gone
    expect(screen.getByTestId('markdown-textarea')).toBeTruthy()
    expect(screen.queryByTestId('markdown-preview-window')).toBeNull()

    // Click again to switch back to preview mode
    fireEvent.click(screen.getByTestId('toggle-markdown-btn'))

    // Preview should be present again, textarea should be gone
    expect(screen.getByTestId('markdown-preview-window')).toBeTruthy()
    expect(screen.queryByTestId('markdown-textarea')).toBeNull()
  })
})