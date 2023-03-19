import React from "react";
import SunEditor from "suneditor-react";
import styled from "styled-components";
import "suneditor/dist/css/suneditor.min.css";

const MySunEditor = styled(SunEditor)`
  position: fixed !important;
  top: 0 !important;
  .sun-editor .se-dialog {
  }
`;

const Editor = ({ onChange, defaultValue, height }) => {
  const editorRef = React.useRef(null);
  // const handleImageUploadBefore = (files, info, uploadHandler) => {
  //   // uploadHandler is a function
  //   console.log(files, info);
  // };
  const handleImageUpload = (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) => {
    console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
  };

  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };
  return (
    <MySunEditor
      height={height}
      placeholder="내용을 적어주세요"
      setContents={defaultValue}
      lang="ko"
      onChange={(e) => {
        onChange(e);
      }}
      getSunEditorInstance={getSunEditorInstance}
      // onImageUploadBefore={handleImageUploadBefore}
      // onImageUpload={handleImageUpload}
      setOptions={{
        defaultStyle: "position: relative; z-index:0;",
        font: ["Arial", "tohoma", "Courier New,Courier"],
        fontSize: [8, 10, 14, 18, 24, 36],
        colorList: [
          [
            "#ccc",
            "#dedede",
            "OrangeRed",
            "Orange",
            "RoyalBlue",
            "SaddleBrown",
          ],
          [
            "SlateGray",
            "BurlyWood",
            "DeepPink",
            "FireBrick",
            "Gold",
            "SeaGreen",
          ],
        ],

        // imageHeight: "50%",
        // imageWidth: "50%",
        // popupDisplay: "local",
        // resizingBar: false,
        buttonList: [
          [
            "font",
            "fontSize",
            "fontColor",
            "hiliteColor",
            "video",
            "fullScreen",
            "codeView",
            "preview",
            "save",
          ],
        ],
      }}
    />
  );
};

export default Editor;
