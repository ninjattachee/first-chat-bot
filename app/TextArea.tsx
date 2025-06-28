import { useEffect, useRef } from "react";
import { FieldValues, RefCallBack, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  minHeight?: number;
  maxHeight?: number;
}

const TextArea = ({
  value,
  onChange,
  placeholder,
  minHeight = 50,
  maxHeight = 300,
}: TextAreaProps) => {
  const queryRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = queryRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      if (scrollHeight <= maxHeight) {
        textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      className="textarea w-full border-none focus:outline-none px-2 py-5 bg-transparent text-base-content resize-none align-bottom"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      ref={queryRef}
      style={{
        minHeight: `${minHeight}px`,
      }}
    ></textarea>
  );
};

export default TextArea;
