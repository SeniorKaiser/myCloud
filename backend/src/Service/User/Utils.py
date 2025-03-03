from difflib import SequenceMatcher

def calculate_similarity(item, param: str) -> float:
    def similarity(a, b):
        """Функция вычисления схожести строк"""
        return SequenceMatcher(None, a, b).ratio() * 100

    name_similarity = similarity(item.name.lower(), param.lower())
    extension_similarity = similarity(item.extension.lower(), param.lower()) if hasattr(item, 'extension') else 0

    return max(name_similarity, extension_similarity)
