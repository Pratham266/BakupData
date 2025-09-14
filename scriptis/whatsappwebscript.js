javascript: (function () {
  const titles = ["Ayushi Di💖", "Amanbhai SP", "Deep SP", "Akil Bhai SP"];

  titles.forEach((title) => {
    const targetDIv = document.querySelector(
      `div[role="listitem"] span[dir="auto"][title="${title}"]`
    );

    if (targetDIv) {
      const targetDivsmall = targetDIv.closest(".x1n2onr6");

      if (targetDivsmall) {
        setTimeout(() => {
          const mouseDownEvent = document.createEvent("MouseEvents");
          console.log("call event for:", title, targetDivsmall);
          mouseDownEvent.initEvent("mousedown", true, true);
          targetDivsmall.dispatchEvent(mouseDownEvent);
        }, 0);
      }
    } else {
      console.log(`Span with title "${title}" not found.`);
    }
  });
})();

javascript: (async function () {
  const titles = ["Ayushi Di💖", "Amanbhai SP", "Deep SP", "Akil Bhai SP"];

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (let index = 0; index < titles.length; index++) {
    const title = titles[index];
    const targetDiv = document.querySelector(
      `div[role="listitem"] span[dir="auto"][title="${title}"]`
    );

    if (targetDiv) {
      const targetDivsmall = targetDiv.closest(".x1n2onr6");

      if (targetDivsmall) {
        console.log("call event for:", title, targetDivsmall);

        const mouseDownEvent = document.createEvent("MouseEvents");
        mouseDownEvent.initEvent("mousedown", true, true);
        targetDivsmall.dispatchEvent(mouseDownEvent);
      }
    } else {
      console.log(`Span with title "${title}" not found.`);
    }

    await delay(1000);
  }
})();
