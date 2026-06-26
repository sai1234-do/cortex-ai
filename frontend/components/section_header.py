import streamlit as st

from frontend.components.base_component import BaseComponent


class SectionHeader(BaseComponent):

    def __init__(
        self,
        title,
        subtitle=""
    ):

        self.title = title
        self.subtitle = subtitle

    def render(self):

        st.markdown(
            f"""
            <h2>{self.title}</h2>

            <p style="color:#B5BAC6;">
            {self.subtitle}
            </p>
            """,
            unsafe_allow_html=True
        )