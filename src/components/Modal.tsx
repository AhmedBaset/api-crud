import React from "react";
import { createPortal } from "react-dom";

type Props = { children: React.ReactNode };

function Modal({ children }: Props) {
	return createPortal(
		<div className="fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-50 p-4">
			<div className="fixed top-1/2 left-1/2 w-[400px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow">
				{children}
			</div>
		</div>
	, document.getElementById("portal")!);
}

export default Modal;
