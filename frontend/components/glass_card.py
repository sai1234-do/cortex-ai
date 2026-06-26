import streamlit as st

from frontend.components.base_component import BaseComponent


class GlassCard(BaseComponent):

    def __init__(
        self,
        title,
        content,
        icon="",
        footer=None
    ):

        self.title = title
        self.content = content
        self.icon = icon
        self.footer = footer

    def render(self):

        st.markdown(
            f"""
            <div class="glass">

            <h3>{self.icon} {self.title}</h3>

            <p>{self.content}</p>

            <small>{self.footer if self.footer else ""}</small>

            </div>
            """,
            unsafe_allow_html=True
        )
#No hardcoded Memory.
#No Resume.
#Completely reusable.