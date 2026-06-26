import streamlit as st

PRIMARY = "#4F8EF7"
SECONDARY = "#8B5CF6"

BACKGROUND = "#0B0F19"

CARD = "#151C2C"

TEXT = "#FFFFFF"

SUBTEXT = "#B5BAC6"

SUCCESS = "#22C55E"

WARNING = "#FACC15"

ERROR = "#EF4444"


def load_theme():
    with open("frontend/assets/style.css") as f:
        st.markdown(
            f"<style>{f.read()}</style>",
            unsafe_allow_html=True
        )