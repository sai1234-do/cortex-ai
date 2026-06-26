from abc import ABC, abstractmethod


class BaseComponent(ABC):
    """
    Base class for every UI component in Cortex AI.
    """

    @abstractmethod
    def render(self):
        pass