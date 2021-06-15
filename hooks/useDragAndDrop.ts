import { useState } from 'react';

export type DragElement = {
    id: string,
    stage: string
}

type Configuration = {
    startCallback: ( dataType: string ) => void,
    endCallback: () => void, 
    dropCallback: () => void 
}

export type Events = {

    handleDragStart: ( e:any ) => void,
    handleDragEnd: ( e:any ) => void,
    handleDragOver: ( e:any ) => void,
    handleDragEnter: ( e:any ) => void,
    handleDragLeave: ( e:any ) => void,
    handleDrop: ( e:any ) => void,

}

type ToolBox = {

    dragSrcEl: DragElement,
    dragDstEl: DragElement,
    events: Events

}

const useDragAndDrop = ( config: Configuration ) : ToolBox => {

    const [dragSrcEl, setDragSrcEl] = useState<DragElement>(null)
    const [dragDstEl, setDragDstEl] = useState<DragElement>(null)

    const handleDragStart = e => {
        
        e.target.style.opacity = "0.4"
        e.target.classList.add("source")

        config.startCallback( e.target.getAttribute( "data-type" )  )

        setDragSrcEl({ 
            id: e.target.getAttribute( "id" ),
            stage: e.target.getAttribute( "data-type" )
        })

    }

    const handleDragEnd = e => {
        
        e.target.style.opacity = "1"

        config.endCallback()

    }

    const handleDragOver = e => {
        
        if (e.preventDefault) {
            e.preventDefault();
        }
      
        return false;

    }

    const handleDragEnter = e => {
        
        let target = e.target

        while( !target.getAttribute( "id" ) )
            target = target.parentElement

        target.classList.add("over")

        setDragDstEl({ 
            id: target.getAttribute( "id" ),
            stage: target.getAttribute( "data-type" )
        })
    }

    const handleDragLeave = e => {
        
        let target = e.target

        while( !target.getAttribute( "id" ) )
            target = target.parentElement

        target.classList.remove("over")

    }

    const handleDrop = e => {
        
        e.stopPropagation()

        config.dropCallback()

        return false

    }

    return {
        dragSrcEl,
        dragDstEl,
        events: {
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleDragEnter,
            handleDragLeave,
            handleDrop
        }
    }
}
 
export default useDragAndDrop;