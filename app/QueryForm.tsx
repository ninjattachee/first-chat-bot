"use client";

import { FieldValues, useForm } from "react-hook-form";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import axios from "axios";

import TextArea from "./TextArea";
import useMessageStore from "./store";

const QueryForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const { addMessage } = useMessageStore();

  const onSubmit = (data: FieldValues) => {
    setValue("text", "");
    addMessage({
      role: "user",
      content: data.text,
    });
    axios
      .post("http://localhost:11434/api/chat", {
        model: "llava:13b",
        messages: [
          {
            role: "user",
            content: data.text,
          },
        ],
        stream: false,
      })
      .then((res) => {
        addMessage({
          role: res.data.message.role,
          content: res.data.message.content,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="relative w-full max-w-3xl sm:px-5 px-2 sm:pb-4 pb-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-base flex flex-col gap-2 items-center justify-center z-10"
      >
        <div className="query-bar w-full border-2 border-base-300 rounded-2xl pb-12 px-2 shadow-md relative">
          <div className="relative z-10">
            <TextArea
              value={watch("text")}
              placeholder="How can I help you today?"
              {...register("text", { required: true, minLength: 1 })}
              onChange={(e) => setValue("text", e.target.value)}
            />
          </div>
          <div className="flex gap-1.5 absolute inset-x-0 bottom-0 border-2 border-transparent p-1 max-w-full justify-end">
            <button type="submit" className="btn btn-soft btn-primary btn-sm">
              Send
            </button>
            <button
              type="button"
              className="btn btn-soft btn-square btn-info btn-sm"
            >
              <MdOutlineKeyboardVoice className="text-2xl text-base-content" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QueryForm;
