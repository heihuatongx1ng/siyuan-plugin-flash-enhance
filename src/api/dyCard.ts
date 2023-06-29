import { isDoMark, isDelete, isUndo, isCarded } from "../lib/status"
import { foreach } from "../lib/utils"
import { settingList } from "../utils/config"
import { fetchPost, showMessage } from "siyuan"

const builtInDeck = '20230218211946-2kw8jgx'

export function dyMakeCard(detail: any, plugin: any) {
    console.log("编辑操作")
    console.log(detail)
    //判断是否打开功能
    let open = settingList.getSetting()["沉浸式制卡"]
    if (!open){
        return;
    }
    foreach(detail.data, (data: any) => {
        // console.log("是否为撤回操作:",isUndo(data))
        foreach(data.doOperations, (item: any) => {
            console.log("\n是否打开动态制卡:\t", open)
            makeMarkCard(item)
        })
    })
}

function makeMarkCard(item: any) {
    let type = item.action
    let marked = isDoMark(item)
    let carded = isCarded(item)
    let needMakeCard = ((type === "insert" || type === "update") && marked && !carded)
    let needDelCard = ((type === "update" && !marked && carded) || (type === "delete"))
    console.log(item.id, "操作类型:", item.action,
        "\n是否已经制卡:\t", carded,
        "\n是否需要制卡:\t", needMakeCard,
        "\n是否需要取消制卡:\t", needDelCard
    )
    if (needMakeCard) {
        addCard(item.id)
    }
    if (needDelCard) {
        removeCard(item.id)
    }
}

async function addCard(id: string){
    let body = {
        deckID: builtInDeck,
        blockIDs: [id],
    };
    fetchPost("/api/riff/addRiffCards", body, (res)=>{
        // showMessage(`${res.data.name}卡包的总卡片数：${res.data.size}`);
    });
}

async function removeCard(id: string){
    let body = {
        deckID: builtInDeck,
        blockIDs: [id],
    };
    fetchPost("/api/riff/removeRiffCards", body, (res)=>{
        // showMessage(`${res.data.name}卡包的剩余卡片数：${res.data.size}`);
    });
}