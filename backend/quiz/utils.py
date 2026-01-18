def evaluate_answer(question, submitted_answer):
    """
    Evaluates correctness based on question type.

    MCQ         -> list[str] (option UUIDs)
    RADIO       -> str (option UUID)
    TEXT        -> str
    FILL_BLANK  -> list[str] (acceptable answers)
    """
    scoring = question.scoring
    correct = scoring.correct_answer
    qtype = question.question_type.code

    # Multiple correct answers
    if qtype == "MCQ":
        if not isinstance(submitted_answer, list):
            return False
        if not isinstance(correct, list):
            return False
        return set(submitted_answer) == set(correct)

    # Single correct answer
    if qtype == "RADIO":
        return submitted_answer == correct

    # Case-insensitive exact match
    if qtype == "TEXT":
        if not isinstance(submitted_answer, str):
            return False
        return submitted_answer.strip().lower() == str(correct).strip().lower()

    # Any one of acceptable answers
    if qtype == "FILL_BLANK":
        if not isinstance(correct, list):
            return False
        submitted = str(submitted_answer).strip().lower()
        acceptable = [str(a).strip().lower() for a in correct]
        return submitted in acceptable

    return False


def calculate_score(question, is_correct):
    scoring = question.scoring
    return scoring.marks_correct if is_correct else scoring.marks_incorrect
