// English as it is — quick quiz on the lesson page.
// Reads questions from <div class="lesson-quiz" data-questions='[...]'>, grades in the browser, nothing is sent anywhere.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lesson-quiz").forEach(function (box) {
    var questions;
    try { questions = JSON.parse(box.getAttribute("data-questions")); } catch (e) { return; }
    var score = 0, answered = 0;
    var list = document.createElement("div");
    box.appendChild(list);
    var result = document.createElement("p");
    result.className = "quiz-result";
    box.appendChild(result);
    questions.forEach(function (q, i) {
      var wrap = document.createElement("div");
      wrap.className = "quiz-q";
      var title = document.createElement("p");
      title.innerHTML = "<strong>" + (i + 1) + ".</strong> " + q.q;
      wrap.appendChild(title);
      if (q.audio) {
        var btn = document.createElement("button");
        btn.type = "button"; btn.textContent = "🔊 Listen";
        btn.className = "quiz-listen";
        btn.addEventListener("click", function () {
          var a = new Audio(q.audio);
          a.play().catch(function (err) { console.log("audio failed", err); });
        });
        wrap.appendChild(btn);
      }
      var feedback = document.createElement("p");
      feedback.className = "quiz-feedback";
      q.options.forEach(function (opt, j) {
        var b = document.createElement("button");
        b.type = "button"; b.textContent = opt; b.className = "quiz-opt";
        b.addEventListener("click", function () {
          if (wrap.getAttribute("data-done")) return;
          wrap.setAttribute("data-done", "1"); answered++;
          if (j === q.answer) { score++; b.classList.add("quiz-right"); feedback.textContent = "Correct! " + (q.why || ""); }
          else { b.classList.add("quiz-wrong"); feedback.textContent = "Not quite — the answer is: " + q.options[q.answer] + ". " + (q.why || ""); }
          result.textContent = "Score: " + score + " / " + answered + " answered (out of " + questions.length + ")";
        });
        wrap.appendChild(b);
      });
      wrap.appendChild(feedback);
      list.appendChild(wrap);
    });
  });
});
