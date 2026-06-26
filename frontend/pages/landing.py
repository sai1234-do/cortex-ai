import streamlit as st

from frontend.pages.base_page import BasePage
from frontend.router.router import Router


class LandingPage(BasePage):

    def render(self):

        st.title("🧠 Cortex AI")

        st.subheader("The Cognitive Operating System")

        st.write(
            "Understand • Remember • Reason • Grow"
        )

        st.divider()

        col1, col2 = st.columns(2)

        with col1:

            if st.button(
                "Create Account",
                use_container_width=True
            ):
                Router.navigate("signup")

        with col2:

            if st.button(
                "Login",
                use_container_width=True
            ):
                Router.navigate("login")