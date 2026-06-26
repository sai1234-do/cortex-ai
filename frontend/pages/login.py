import streamlit as st

from frontend.pages.base_page import BasePage
from frontend.router.router import Router


class LoginPage(BasePage):

    def render(self):

        st.title("Login")

        st.text_input("Email")

        st.text_input(
            "Password",
            type="password"
        )

        col1, col2 = st.columns(2)

        with col1:

            if st.button(
                "Back",
                use_container_width=True
            ):
                Router.navigate("landing")

        with col2:

            st.button(
                "Login",
                use_container_width=True
            )