/***
 * This files contains the js for the front side of anki cards.
 */
import { settingList } from "../utils/config"
import { IMenuItemOption, Dialog } from "siyuan";
import * as OcclusionEditor from "../components/OcclusionEditor.vue"
import { createApp } from "vue";
import { fabric } from "fabric";

type Occasion = {
    "left":number,
    "top":number,
    "width":number,
    "height":number,
    "angle":number,
    "cId":number}

type OcclusionList = Map<string,Occasion[]>

export function occasionEdit({detail}: any){
    let open = settingList.getSetting()["图像遮挡"]
    if (!open){
        return;
    }
    // console.log("编辑遮挡")
    console.log(detail);
    let myMenu:IMenuItemOption = {
        label:"编辑图像遮挡",
        icon:"iconAdd",
        click:()=>{openOcclusionEditor(detail.element)}
    };
    detail.menu.addItem(myMenu)
}
export function occasionLoad({detail}: any){
    let open = settingList.getSetting()["图像遮挡"]
    if (!open){
        return;
    }
    console.log("启动遮挡")
}

function openOcclusionEditor(img:HTMLElement){
    console.log("开始编辑遮挡")
    const occlusionEditorDialog = new Dialog({
        title:"图像遮挡编辑",
        content:"<div id='image-editor'></div>"
    })
    const AppOcclusionEditor = createApp(OcclusionEditor.default,{
        closeFunc:()=>{occlusionEditorDialog.destroy()},
        img:img
        })
    AppOcclusionEditor.mount(occlusionEditorDialog.element.querySelector("#image-editor"))

}
// import { createOcclusionRectEl } from "../ui/OcclusionEditor";
// import path from "path-browserify";

// window.addEventListener("load-of", () => {
//     if (type == "image_occlusion") {
//         // Get current cloze id (only works for image occlusion)
//         let currentClozeId = "-1";
//         for (let i = 1; i <= 9; i++)
//             if (document.getElementById(`c${i}`)) currentClozeId = `${i}`;
//         console.log(`Current cloze id: ${currentClozeId}`);
//         if (currentClozeId == "-1") return;
//         // Get localImgBasePath
//         let localImgBasePath = document.getElementById("localImgBasePath").src;
//         localImgBasePath = localImgBasePath.substring(
//             0,
//             localImgBasePath.lastIndexOf("/"),
//         );
//         // Replace all images with canvas
//         let imgToCanvasHashMap = {};
//         let images = Array.from(document.getElementsByTagName("img"));
//         for (let image of images) {
//             image.style.visibility = "hidden";
//             let canvasEl = document.createElement("canvas");
//             canvasEl.width = image.width;
//             canvasEl.height = image.height;
//             let canvas = new fabric.Canvas(canvasEl, {
//                 imageSmoothingEnabled: false,
//             });
//             let imgEl = new Image();
//             imgEl.src = image.src;
//             imgEl.onload = function () {
//                 let imgFabric = new fabric.Image(imgEl);
//                 let scaleX = canvas.width / imgFabric.width,
//                     scaleY = canvas.height / imgFabric.height;
//                 canvas.setViewportTransform([scaleX, 0, 0, scaleY, 0, 0]);
//                 canvas.setBackgroundImage(
//                     imgFabric,
//                     canvas.renderAll.bind(canvas),
//                     {
//                         scaleX: 1,
//                         scaleY: 1,
//                     },
//                 );
//             };
//             canvasEl.style.position = "relative";
//             image.replaceWith(canvasEl);
//             if (imgToCanvasHashMap[image.src] == null)
//                 imgToCanvasHashMap[image.src] = [];
//             imgToCanvasHashMap[image.src].push(canvas);
//         }

//         // Show the main content (without images)
//         document.getElementById("main-content").style.visibility = "visible";

//         // Iterate the imgToOcclusionArrHashMap to draw the occlusion and inject the canvas into dom instead of images
//         let imgToOcclusionArrHashMap = JSON.parse(
//             document.getElementById("imgToOcclusionArrHashMap").innerHTML,
//         );
//         for (let image in imgToOcclusionArrHashMap) {
//             let occlusionArr = imgToOcclusionArrHashMap[image];
//             occlusionArr.forEach((obj) => {
//                 if (obj.cId == currentClozeId) {
//                     (
//                         imgToCanvasHashMap[
//                             localImgBasePath + "/" + path.basename(image)
//                         ] ||
//                         imgToCanvasHashMap[image] ||
//                         []
//                     ).forEach((canvas) => {
//                         let occlusion = createOcclusionRectEl(
//                             obj.left,
//                             obj.top,
//                             obj.width,
//                             obj.height,
//                             obj.angle,
//                             obj.cId,
//                         );
//                         occlusion._objects[0].set("opacity", 1);
//                         canvas.add(occlusion);
//                         canvas.renderAll();
//                     });
//                 }
//             });
//         }
//     }
// });

