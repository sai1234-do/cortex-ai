import { useState } from "react";

import {
    FiCopy,
    FiCheck,
    FiThumbsUp,
    FiThumbsDown,
    FiMoreHorizontal
} from "react-icons/fi";

import { motion } from "framer-motion";

import styles from "../styles/MessageActions.module.css";

export default function MessageActions({ content }) {

    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(content);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 1800);

        } catch (err) {

            console.error("Copy failed:", err);

        }

    };

    const handleLike = () => {

        setLiked((prev) => !prev);

        if (disliked) {

            setDisliked(false);

        }

    };

    const handleDislike = () => {

        setDisliked((prev) => !prev);

        if (liked) {

            setLiked(false);

        }

    };

    const handleMore = () => {

        console.log("More actions clicked");

    };

    return (

        <motion.div

            className={styles.actions}

            initial={{
                opacity: 0,
                y: 12,
                scale: 0.95
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.22,
                ease: "easeOut"
            }}

        >

            <button

                title="Copy message"

                onClick={handleCopy}

            >

                {copied ? <FiCheck /> : <FiCopy />}

            </button>

            <button

                title="Good response"

                onClick={handleLike}

            >

                <FiThumbsUp

                    color={liked ? "#22C55E" : undefined}

                />

            </button>

            <button

                title="Bad response"

                onClick={handleDislike}

            >

                <FiThumbsDown

                    color={disliked ? "#EF4444" : undefined}

                />

            </button>

            <button

                title="More actions"

                onClick={handleMore}

            >

                <FiMoreHorizontal />

            </button>

        </motion.div>

    );

}