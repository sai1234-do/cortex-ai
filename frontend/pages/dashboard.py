import streamlit as st

from frontend.pages.base_page import BasePage


class DashboardPage(BasePage):

    def render(self):

        st.title("Dashboard")

        st.success("Welcome to Cortex AI")