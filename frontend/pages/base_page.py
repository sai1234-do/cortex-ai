from abc import ABC, abstractmethod


class BasePage(ABC):
    """
    Every page in Cortex inherits from this class.
    """

    @abstractmethod
    def render(self):
        pass