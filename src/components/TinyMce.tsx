import { Editor } from "@tinymce/tinymce-react";

const TinyMce: React.FC<any> = ({ initContent, getContent }) => {
  console.log(initContent);
  return (
    <Editor
      apiKey="df4xfwysyt7xdzreywi9m58z5jpaj5ke6cwff4zgobsp54ru"
      init={{
        placeholder: "Nhập mô tả sản phẩm",
        height: 600,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        images_file_types: "jpg,jpeg,png,webp",
        file_picker_types: "image",
        /* and here's our custom image picker*/
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.addEventListener("change", (e: Event) => {
            const file = e.target?.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              const id = "blobid" + new Date().getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result?.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
      }}
      initialValue={initContent}
      // onInit={(e, editor) => {
      //   initContent &&
      //     editor.setContent("<p>Hello world!</p>", { format: "text" });
      // }}
      onEditorChange={(data, _) => getContent(data)}
    />
  );
};

export default TinyMce;
