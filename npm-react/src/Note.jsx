import { useEffect, useRef } from "react";

export default function Note({ id, initialHtml, onChange, onDelete }) {
  const elRef = useRef(null);
  const initialized = useRef(false);

  // Set initial HTML once
  useEffect(() => {
    if (!initialized.current && elRef.current) {
      elRef.current.innerHTML = initialHtml || "";
      initialized.current = true;
    }
  }, [initialHtml]);

  // Handle Enter key → insert <br>
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const br = document.createElement("br");
      range.insertNode(br);
      range.setStartAfter(br);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      onChange(id, elRef.current.innerHTML); // update immediately
    }
  };

  const handleInput = () => {
    onChange(id, elRef.current.innerHTML); // save HTML immediately
  };

  return (
    <div className="note-wrapper">
      <p
        ref={elRef}
        className="input-box"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <div className="delete-btn" onClick={() => onDelete(id)}>
        <img src="/assets/delete.png" alt="delete" />
      </div>
    </div>
  );
}
