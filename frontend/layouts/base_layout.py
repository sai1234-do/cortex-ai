from abc import ABC, abstractmethod


class BaseLayout(ABC):
    """
    Every layout inherits from this class.
    """

    @abstractmethod
    def render(self):
        pass