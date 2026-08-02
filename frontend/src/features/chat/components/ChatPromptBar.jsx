import { useState } from "react";
import PromptBar from "../../../components/shared/PromptBar/PromptBar";
import FeaturePreviewModal from "../../dashboard/components/common/FeaturePreviewModal";

export default function ChatPromptBar() {
    const [modal, setModal] = useState({
        open: false,
        title: "",
        description: ""
    });

    return (
        <>
            <PromptBar
                mode="chat"
                onWebClick={() =>
                    setModal({
                        open: true,
                        title: "🌐 Web Search",
                        description: "Web Search mode will allow Cortex AI to search the internet and answer using trusted sources,feature unlocks soon"

                    })
                }
                onThinkClick={() =>
                    setModal({
                        open: true,
                        title: "🧠 Think Mode",
                        description: "Think Mode will use deeper reasoning before answering complex questions,feature unlocks soon"
                    })
                }
            />

            <FeaturePreviewModal
                open={modal.open}
                title={modal.title}
                description={modal.description}
                onClose={() =>
                    setModal({
                        open: false,
                        title: "",
                        description: ""
                    })
                }
            />
        </>
    );
}