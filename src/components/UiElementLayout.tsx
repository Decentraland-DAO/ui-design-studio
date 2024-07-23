import { Div } from "@/pages/CreateUi";
import React from "react";
import { MoveIcon, ResizeIcon } from "./icons/UiElementIcons";
import { Lock, Unlock } from "./icons/Lock";
import { Trash } from "./icons/Delete";

type UiElementLayoutProps = {
    children: React.ReactNode;
    div: Div;
    isMouseEnter: boolean;
    setIsMouseEnter: React.Dispatch<React.SetStateAction<boolean>>;
    onSelect: (div: Div, e: React.MouseEvent) => void;
    selected: Div | null;
    onResizeMouseDown: (e: React.MouseEvent) => void;
    dragMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleSetLock: (lock: boolean) => void;
    setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UiElementLayout = ({
    children,
    div,
    isMouseEnter,
    setIsMouseEnter,
    onSelect,
    selected,
    onResizeMouseDown,
    dragMouseDown,
    handleSetLock,
    setDeleteItem,
    setShowDeleteModal,
}: UiElementLayoutProps) => {
    return (
        <div
            className={`ui-element flex cursor-pointer select-none items-center justify-center text-center`}
            style={{
                display: div.display,
                position: div.positionType,
                left: `${div.position.x}%`,
                top: `${div.position.y}%`,
                width: `${div.size.width}px`,
                height: `${div.size.height}px`,
                flexDirection: div.flexDirection,
                justifyContent: div.justifyContent,
                alignItems: div.alignItems,
                alignContent: div.alignContent,
                flexWrap: div.flexWrap,
                margin: `${div.margin.top}px ${div.margin.right}px ${div.margin.bottom}px ${div.margin.left}px`,
                padding: `${div.padding.top}px ${div.padding.right}px ${div.padding.bottom}px ${div.padding.left}px`,
                zIndex: 9,
                backgroundColor:
                    div.uiElementType === "input" ? "" : div.backgroundColor,
                color: div.textColor,
            }}
            onMouseEnter={() => {
                setIsMouseEnter(true);
            }}
            onMouseLeave={() => setIsMouseEnter(false)}
            onClick={(e) => {
                onSelect(div, e);
                console.log(div, e);
            }}
        >
            {children}
            {selected && selected.uuid === div.uuid && (
                <div
                    className="resize-handle cursor-se-resize rounded-full bg-slate-100 bg-opacity-50 text-black"
                    style={{
                        position: "absolute",
                        right: "-15px",
                        bottom: "-15px",
                        padding: "5px",
                    }}
                    onMouseDown={onResizeMouseDown}
                >
                    <ResizeIcon />
                </div>
            )}
            {selected && selected.uuid === div.uuid && div.containerName === "" && (
                <div
                    className="cursor-move rounded-full bg-slate-100 bg-opacity-50 text-black"
                    style={{
                        position: "absolute",
                        left: "-15px",
                        top: "-15px",
                        padding: "5px",
                    }}
                    onMouseDown={dragMouseDown}
                >
                    <MoveIcon />
                </div>
            )}
            {(isMouseEnter || (selected && selected.uuid === div.uuid)) && (
                <div className="absolute -top-10 left-5 flex w-fit flex-row whitespace-nowrap bg-slate-900 bg-opacity-50">
                    <div className="p-2 text-xs text-white">{div.name}</div>
                    <div
                        className="p-2 text-xs text-white"
                        onClick={() => handleSetLock(!div.lock)}
                    >
                        {div.lock ? <Lock /> : <Unlock />}
                    </div>
                    <div
                        className="p-2 text-xs text-white"
                        onClick={() => {
                            if (div.lock) return;
                            setDeleteItem(div);
                            setShowDeleteModal(true);
                        }}
                    >
                        <Trash />
                    </div>
                </div>
            )}
        </div>
    );
};
