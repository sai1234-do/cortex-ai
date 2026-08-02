import React from "react";

export default class ErrorBoundary extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            hasError: false

        };

    }

    static getDerivedStateFromError() {

        return {

            hasError: true

        };

    }

    componentDidCatch(error, info) {

        console.error(error);
        console.error(info);

    }

    render() {

        if (this.state.hasError) {

            return (

                <div
                    style={{

                        height: "100vh",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        flexDirection: "column",

                        gap: 18

                    }}
                >

                    <h1>

                        ⚠️ Cortex facing issues ,come back later

                    </h1>

                    <p>

                        Something unexpected happened.

                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                    >

                        Reload Cortex

                    </button>

                </div>

            );

        }

        return this.props.children;

    }

}