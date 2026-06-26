import streamlit as st

from config.theme import load_theme

from frontend.router.router import Router

from frontend.pages.landing import LandingPage
from frontend.pages.login import LoginPage
from frontend.pages.signup import SignupPage
from frontend.pages.dashboard import DashboardPage


st.set_page_config(
    page_title="Cortex AI",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="collapsed"
)

load_theme()

Router.init()

PAGES = {
    "landing": LandingPage(),
    "login": LoginPage(),
    "signup": SignupPage(),
    "dashboard": DashboardPage(),
}

PAGES[st.session_state.page].render()