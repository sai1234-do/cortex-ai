import streamlit as st

from frontend.components.base_component import BaseComponent


class HeroBanner(BaseComponent):

    def __init__(
        self,
        title,
        subtitle
    ):

        self.title = title
        self.subtitle = subtitle

    def render(self):

        st.markdown(
            f"""
            <div style="text-align:center;padding:50px;">

            <h1>{self.title}</h1>

            <p style="font-size:22px;color:#B5BAC6;">

            {self.subtitle}

            </p>

            </div>
            """,
            unsafe_allow_html=True
        )