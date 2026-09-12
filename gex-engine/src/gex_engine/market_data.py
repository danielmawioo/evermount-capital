from gex_engine.live import feed
from gex_engine.models import OptionQuote, UnderlyingState


class LiveMarketDataSource:
    def underlying(self) -> UnderlyingState:
        state = feed.current()
        if state.underlying is None:
            raise RuntimeError(state.error or "No live underlying")
        return state.underlying

    def option_chain(self) -> list[OptionQuote]:
        return feed.current().quotes
