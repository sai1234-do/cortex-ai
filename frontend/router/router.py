import streamlit as st


class Router:

    @staticmethod
    def init():

        if "page" not in st.session_state:
            st.session_state.page = "landing"

        if "user" not in st.session_state:
            st.session_state.user = None

    @staticmethod
    def navigate(page):

        st.session_state.page = page

        st.rerun()