(function () {
  var aiTelegramUrl = "https://t.me/alxtesstbot";
  var humanTelegramUrl = "https://t.me/alxtestsbot";
  var widgetRoot = document.createElement("div");
  widgetRoot.innerHTML = [
    '<button class="site-widget-launcher site-accessibility-launcher" id="site-accessibility-toggle" type="button" aria-label="Open accessibility settings" aria-expanded="false" aria-controls="site-accessibility-panel"><i class="fa-solid fa-universal-access" aria-hidden="true"></i></button>',
    '<section class="site-widget-panel site-accessibility-panel" id="site-accessibility-panel" role="dialog" aria-modal="false" aria-labelledby="site-accessibility-title" hidden>',
    '<div class="site-widget-panel-header"><h2 id="site-accessibility-title" tabindex="-1">Accessibility settings</h2><button class="site-widget-close" id="site-accessibility-close" type="button" aria-label="Close accessibility settings">×</button></div>',
    '<div class="site-accessibility-grid" id="site-accessibility-grid"></div>',
    '<div class="site-accessibility-actions"><button class="site-accessibility-action" id="site-read-selected-text" type="button">Read selected text</button><button class="site-accessibility-action" id="site-stop-reading" type="button">Stop reading</button></div>',
    '<p class="site-accessibility-status" id="site-accessibility-status" role="status" aria-live="polite">Hover reading uses a voice available on this device.</p>',
    '<button class="site-accessibility-reset" id="site-accessibility-reset" type="button">↻ &nbsp; Reset All Settings</button>',
    "</section>",
    '<button class="site-widget-launcher site-ai-launcher" id="site-ai-toggle" type="button" aria-label="Open AI chatbot options" aria-expanded="false" aria-controls="site-ai-menu site-ai-chat"><i class="fa-solid fa-robot" aria-hidden="true"></i></button>',
    '<section class="site-widget-panel site-ai-menu" id="site-ai-menu" role="dialog" aria-modal="false" aria-labelledby="site-ai-menu-title" hidden>',
    '<div class="site-widget-panel-header"><h2 id="site-ai-menu-title" tabindex="-1">Multilingual assistant</h2><button class="site-widget-close" id="site-ai-menu-close" type="button" aria-label="Close assistant options">×</button></div>',
    '<div class="site-ai-menu-body"><button class="site-ai-choice" id="site-ai-text-option" type="button"><i class="fa-solid fa-comments" aria-hidden="true"></i><span>Text and voice tutor</span></button><a class="site-ai-choice" href="' +
      humanTelegramUrl +
      '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-telegram" aria-hidden="true"></i><span>Talk to a real human</span></a></div>',
    "</section>",
    '<section class="site-widget-panel site-ai-chat" id="site-ai-chat" role="dialog" aria-modal="false" aria-labelledby="site-ai-chat-title" hidden>',
    '<div class="site-widget-panel-header"><h2 id="site-ai-chat-title" tabindex="-1">Multilingual assistant</h2><button class="site-widget-close" id="site-ai-chat-close" type="button" aria-label="Close assistant">×</button></div>',
    '<div class="site-ai-chat-body">',
    '<nav class="site-assistant-tabs" role="tablist" aria-label="Assistant tools">',
    '<button id="site-tab-tutor" role="tab" aria-selected="true" aria-controls="site-panel-tutor" type="button">Tutor</button>',
    '<button id="site-tab-career" role="tab" aria-selected="false" aria-controls="site-panel-career" type="button" tabindex="-1">Career Gateway</button>',
    '<button id="site-tab-teacher" role="tab" aria-selected="false" aria-controls="site-panel-teacher" type="button" tabindex="-1">Teacher view</button>',
    "</nav>",
    '<section id="site-panel-tutor" class="site-assistant-tab-panel" role="tabpanel" aria-labelledby="site-tab-tutor">',
    '<p class="site-prototype-note">Prototype: the offline FAQ quotes this page only and links each result to its source. It will not guess when it cannot find support.</p>',
    '<div class="site-provider-row"><label for="site-ai-provider">Answer source</label><select class="form-select form-select-sm" id="site-ai-provider"><option>Offline FAQ — this page</option><option disabled>Cloud AI — not configured</option><option disabled>Local model — not configured</option></select></div>',
    '<button class="btn btn-outline-secondary btn-sm site-simple-mode" id="site-simple-mode" type="button" aria-pressed="false">Simple mode: Off</button><p class="site-small-note">Simple mode enlarges text and hides advanced options; it does not rewrite source material.</p>',
    '<div class="site-voice-row"><label for="site-voice-language">Voice language</label><select class="form-select form-select-sm" id="site-voice-language"><option value="en-US">English</option><option value="am-ET">Amharic</option></select><button class="btn btn-outline-secondary btn-sm" id="site-voice-input" type="button">Use voice</button></div>',
    '<div class="site-chat-log" id="site-chat-log" role="log" aria-live="polite" aria-relevant="additions text" dir="auto"><p class="site-chat-message site-chat-assistant">Ask about this page. Replies use matching page text and include a citation.</p></div>',
    '<form id="site-tutor-form"><label class="form-label" for="site-tutor-question">Your question</label><textarea class="form-control mb-2" id="site-tutor-question" maxlength="2000" dir="auto" required placeholder="Ask in English or Amharic"></textarea><div class="site-chat-actions"><button class="btn btn-primary" type="submit">Ask page FAQ</button><button class="btn btn-outline-secondary" id="site-ai-telegram-fallback" type="button">Continue in Telegram</button></div></form>',
    '<label class="site-announce-toggle"><input id="site-announce-replies" type="checkbox"> Read answers aloud</label>',
    '<p class="site-ai-status small mb-0" id="site-tutor-status" role="status" aria-live="polite"></p>',
    '<p class="site-small-note">Voice input depends on browser speech support. Cloud AI and the local model are not connected in this demo.</p>',
    "</section>",
    '<section id="site-panel-career" class="site-assistant-tab-panel" role="tabpanel" aria-labelledby="site-tab-career" hidden>',
    '<p>Career Gateway prototype: this page has no job listings. You can ask the Telegram assistant about jobs, request Telegram job alerts, or contact a person.</p>',
    '<form id="site-career-form"><label class="form-label" for="site-career-question">Ask about jobs or careers</label><textarea class="form-control mb-2" id="site-career-question" maxlength="1500" dir="auto" required placeholder="Type a job or career question"></textarea><button class="btn btn-primary w-100" type="submit">Ask in Telegram</button></form>',
    '<div class="site-career-actions"><a class="btn btn-outline-primary btn-sm" id="site-job-alerts" href="' +
      aiTelegramUrl +
      '" target="_blank" rel="noopener noreferrer">Request Telegram job alerts</a><button class="btn btn-outline-secondary btn-sm" type="button" disabled aria-describedby="site-sms-note">SMS alerts unavailable</button></div>',
    '<p class="site-small-note" id="site-sms-note">SMS needs a configured phone number and provider.</p>',
    '<a class="btn btn-outline-primary btn-sm" id="site-accommodation-link" href="' +
      humanTelegramUrl +
      '" target="_blank" rel="noopener noreferrer">Request interview accommodations</a>',
    '<p class="site-small-note">Share accommodation details directly with support; this page does not collect them.</p>',
    '<a class="btn btn-success w-100 mt-2" href="' +
      humanTelegramUrl +
      '" target="_blank" rel="noopener noreferrer">Talk to a real person on Telegram</a>',
    '<button class="btn btn-outline-secondary w-100 mt-2" type="button" disabled aria-describedby="site-screen-share-note">Start screen sharing</button>',
    '<p class="site-small-note mb-0" id="site-screen-share-note">Screen sharing requires a live support-call service, which is not connected in this static demo.</p>',
    "</section>",
    '<section id="site-panel-teacher" class="site-assistant-tab-panel" role="tabpanel" aria-labelledby="site-tab-teacher" hidden>',
    '<p>Anonymous topic counts for this browser session only. No names or question text are stored.</p>',
    '<div id="site-teacher-stats" aria-live="polite"></div>',
    '<p class="site-small-note">A shared teacher dashboard requires a backend; these demo counts are not shared across learners.</p>',
    "</section>",
    "</div>",
    "</section>",
  ].join("");
  while (widgetRoot.firstChild) {
    document.body.appendChild(widgetRoot.firstChild);
  }

  var root = document.documentElement;
  var accessibilityToggle = document.getElementById("site-accessibility-toggle");
  var accessibilityPanel = document.getElementById("site-accessibility-panel");
  var accessibilityTitle = document.getElementById("site-accessibility-title");
  var accessibilityGrid = document.getElementById("site-accessibility-grid");
  var accessibilityStatus = document.getElementById("site-accessibility-status");
  var aiToggle = document.getElementById("site-ai-toggle");
  var aiMenu = document.getElementById("site-ai-menu");
  var aiMenuTitle = document.getElementById("site-ai-menu-title");
  var aiChat = document.getElementById("site-ai-chat");
  var aiChatTitle = document.getElementById("site-ai-chat-title");
  var aiTextOption = document.getElementById("site-ai-text-option");
  var tutorForm = document.getElementById("site-tutor-form");
  var tutorQuestion = document.getElementById("site-tutor-question");
  var tutorStatus = document.getElementById("site-tutor-status");
  var chatLog = document.getElementById("site-chat-log");
  var careerForm = document.getElementById("site-career-form");
  var careerQuestion = document.getElementById("site-career-question");
  var teacherStats = document.getElementById("site-teacher-stats");
  var latestAnswer = "";
  var topicCounts = Object.create(null);
  var hoverReadTarget = null;
  var hoverReadTimer = null;
  var speechRequestId = 0;
  var cloudSpeechRequest = null;
  var cloudAudio = null;
  var cloudAudioUrl = null;
  var readableBlockSelector = "h1,h2,h3,h4,h5,h6,p,li,blockquote,td,th,dt,dd,figcaption,caption";
  var settings = [
    { key: "hide-images", label: "Hide Images", icon: "fa-image", values: ["Off", "On"] },
    { key: "zoom", label: "Zoom", icon: "fa-magnifying-glass-plus", values: ["x1", "x1.25", "x1.5", "x2"] },
    { key: "contrast", label: "Contrast", icon: "fa-circle-half-stroke", values: ["Normal", "High"] },
    { key: "highlight-links", label: "Highlight Links", icon: "fa-link", values: ["Off", "On"] },
    { key: "text-spacing", label: "Text Spacing", icon: "fa-text-width", values: ["Normal", "Wide"] },
    { key: "dyslexia-font", label: "Dyslexia Font", icon: "fa-font", values: ["Normal", "On"] },
    { key: "text-align", label: "Text Align", icon: "fa-align-left", values: ["Left", "Center", "Right"] },
    { key: "cursor", label: "Cursor", icon: "fa-arrow-pointer", values: ["Normal", "Large"] },
    { key: "line-height", label: "Line Height", icon: "fa-text-height", values: ["Normal", "1.5", "2"] },
    { key: "saturate", label: "Saturate", icon: "fa-sun", values: ["Normal", "High", "Low"] },
    { key: "read-on-hover", label: "Read on Hover", icon: "fa-volume-high", values: ["Off", "On"] },
  ];
  var settingIndexes = {};

  settings.forEach(function (setting) {
    settingIndexes[setting.key] = 0;
    var button = document.createElement("button");
    button.className = "site-accessibility-option";
    button.type = "button";
    button.setAttribute("data-accessibility-setting", setting.key);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML =
      '<i class="fa-solid ' +
      setting.icon +
      '" aria-hidden="true"></i><span class="site-accessibility-label">' +
      setting.label +
      '</span><span class="site-accessibility-value">' +
      setting.values[0] +
      "</span>";
    accessibilityGrid.appendChild(button);
  });

  function setPanel(panel, toggle, open, focusTarget) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open && focusTarget) {
      focusTarget.focus();
    }
  }

  function closeAllPanels() {
    accessibilityPanel.hidden = true;
    aiMenu.hidden = true;
    aiChat.hidden = true;
    accessibilityToggle.setAttribute("aria-expanded", "false");
    aiToggle.setAttribute("aria-expanded", "false");
  }

  function applySetting(key, index) {
    root.classList.remove(
      "a11y-hide-images",
      "a11y-high-contrast",
      "a11y-highlight-links",
      "a11y-text-spacing",
      "a11y-dyslexia-font",
      "a11y-align-center",
      "a11y-align-right",
      "a11y-large-cursor",
      "a11y-line-height-15",
      "a11y-line-height-2",
      "a11y-saturated",
      "a11y-desaturated"
    );

    settings.forEach(function (setting) {
      var settingIndex = setting.key === key ? index : settingIndexes[setting.key];
      var state = setting.values[settingIndex];
      var button = accessibilityGrid.querySelector('[data-accessibility-setting="' + setting.key + '"]');
      button.querySelector(".site-accessibility-value").textContent = state;
      button.setAttribute("aria-pressed", String(settingIndex > 0));

      if (setting.key === "zoom") {
        document.body.style.zoom = state === "x1" ? "" : state.replace("x", "");
      } else if (setting.key === "text-align" && state !== "Left") {
        root.classList.add(state === "Center" ? "a11y-align-center" : "a11y-align-right");
      } else if (setting.key === "line-height" && state !== "Normal") {
        root.classList.add(state === "1.5" ? "a11y-line-height-15" : "a11y-line-height-2");
      } else if (setting.key === "saturate" && state !== "Normal") {
        root.classList.add(state === "High" ? "a11y-saturated" : "a11y-desaturated");
      } else if (setting.key === "cursor" && state === "Large") {
        root.classList.add("a11y-large-cursor");
      } else if (state !== setting.values[0]) {
        root.classList.add("a11y-" + setting.key);
      }
    });
  }

  function getPageSpeechLanguage() {
    var languageSelect = document.getElementById("page-language");
    var languageCode = languageSelect ? languageSelect.value : document.documentElement.lang || "en";
    var locales = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      so: "so-SO",
      ar: "ar-XA",
    };
    return locales[languageCode] || languageCode;
  }

  function stopPageSpeech(message) {
    speechRequestId += 1;
    window.clearTimeout(hoverReadTimer);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    cancelCloudSpeech();
    if (message) {
      accessibilityStatus.textContent = message;
    }
  }

  function clearCloudAudio() {
    if (cloudAudio) {
      cloudAudio.onended = null;
      cloudAudio.onerror = null;
      cloudAudio.pause();
      cloudAudio.removeAttribute("src");
      cloudAudio.load();
      cloudAudio = null;
    }
    if (cloudAudioUrl) {
      window.URL.revokeObjectURL(cloudAudioUrl);
      cloudAudioUrl = null;
    }
  }

  function cancelCloudSpeech() {
    if (cloudSpeechRequest) {
      cloudSpeechRequest.abort();
      cloudSpeechRequest = null;
    }
    clearCloudAudio();
  }

  function requestCloudSpeech(text, language, requestId, unavailableMessage) {
    var endpoint = window.SAVANNA_TTS_ENDPOINT;
    if (typeof endpoint !== "string" || !endpoint.trim()) {
      accessibilityStatus.textContent = unavailableMessage;
      return;
    }
    if (typeof window.fetch !== "function" || typeof window.URL.createObjectURL !== "function") {
      accessibilityStatus.textContent = "Cloud speech playback is not supported by this browser. The text remains available on screen.";
      return;
    }

    var controller = typeof window.AbortController === "function" ? new window.AbortController() : null;
    cloudSpeechRequest = controller;
    accessibilityStatus.textContent = "Requesting an online " + language + " voice.";

    window
      .fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, language: language }),
        signal: controller ? controller.signal : undefined,
        cache: "no-store",
      })
      .then(function (response) {
        if (!response.ok) {
          return response.json().then(
            function (body) {
              throw new Error(body.error || "TTS service returned HTTP " + response.status + ".");
            },
            function () {
              throw new Error("TTS service returned HTTP " + response.status + ".");
            }
          );
        }
        var contentType = response.headers.get("Content-Type") || "";
        if (contentType.toLowerCase().indexOf("audio/") !== 0) {
          throw new Error("TTS service did not return audio.");
        }
        return response.blob();
      })
      .then(function (audioBlob) {
        if (requestId !== speechRequestId) {
          return;
        }
        cloudSpeechRequest = null;
        if (!audioBlob.size) {
          throw new Error("TTS service returned an empty audio file.");
        }
        clearCloudAudio();
        cloudAudioUrl = window.URL.createObjectURL(audioBlob);
        cloudAudio = new window.Audio(cloudAudioUrl);
        cloudAudio.onended = function () {
          if (requestId === speechRequestId) {
            accessibilityStatus.textContent = "Finished reading.";
          }
          clearCloudAudio();
        };
        cloudAudio.onerror = function () {
          if (requestId === speechRequestId) {
            accessibilityStatus.textContent = "Online speech could not be played. The text remains available on screen.";
          }
          clearCloudAudio();
        };
        accessibilityStatus.textContent = "Reading text aloud.";
        var playback = cloudAudio.play();
        if (playback && typeof playback.catch === "function") {
          playback.catch(function (error) {
            if (requestId === speechRequestId) {
              accessibilityStatus.textContent =
                "Online speech could not be played: " + error.message + ". The text remains available on screen.";
            }
            clearCloudAudio();
          });
        }
      })
      .catch(function (error) {
        if (requestId !== speechRequestId || error.name === "AbortError") {
          return;
        }
        cloudSpeechRequest = null;
        accessibilityStatus.textContent =
          "Google Cloud speech failed: " + error.message + " The text remains available on screen.";
        console.error("Google Cloud Text-to-Speech request failed.", error);
      });
  }

  function speakPageText(text) {
    var content = text.trim();
    if (!content) {
      return;
    }
    var requestId = ++speechRequestId;
    var language = getPageSpeechLanguage();
    cancelCloudSpeech();
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      requestCloudSpeech(
        content,
        language,
        requestId,
        "No browser voice is available and Google Cloud TTS is not configured. The text remains available on screen."
      );
      return;
    }

    var languagePrefix = language.slice(0, 2).toLowerCase();
    var attempts = 0;
    window.speechSynthesis.cancel();
    accessibilityStatus.textContent = "Looking for an available " + language + " voice.";

    function speakWhenVoicesLoad() {
      if (requestId !== speechRequestId) {
        return;
      }
      var voices = window.speechSynthesis.getVoices();
      var voice = voices.filter(function (candidate) {
        return candidate.lang && candidate.lang.toLowerCase().indexOf(languagePrefix) === 0;
      })[0];
      if (!voice && voices.length === 0 && attempts < 5) {
        attempts += 1;
        window.setTimeout(speakWhenVoicesLoad, 250);
        return;
      }
      if (!voice) {
        requestCloudSpeech(
          content,
          language,
          requestId,
          "No " + language + " voice is available on this device and Google Cloud TTS is not configured. The text remains available on screen."
        );
        return;
      }

      var utterance = new window.SpeechSynthesisUtterance(content);
      utterance.voice = voice;
      utterance.lang = voice.lang || language;
      utterance.onend = function () {
        if (requestId === speechRequestId) {
          accessibilityStatus.textContent = "Finished reading.";
        }
      };
      utterance.onerror = function () {
        if (requestId === speechRequestId) {
          accessibilityStatus.textContent = "The browser could not read this text aloud.";
        }
      };
      accessibilityStatus.textContent = "Reading text aloud.";
      window.speechSynthesis.speak(utterance);
    }

    speakWhenVoicesLoad();
  }

  function getReadableBlock(target) {
    if (!target || typeof target.closest !== "function") {
      return null;
    }
    var main = target.closest("main");
    if (!main) {
      return null;
    }
    var block = target.closest(readableBlockSelector);
    if (block && main.contains(block)) {
      return block;
    }

    var current = target;
    while (current && current !== main) {
      if (current.matches("button,a,label,summary,div,section,article,span") && current.innerText) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }

  document.addEventListener("pointerover", function (event) {
    if (!settingIndexes["read-on-hover"] || event.pointerType === "touch") {
      return;
    }
    var block = getReadableBlock(event.target);
    if (!block || block === hoverReadTarget || (event.relatedTarget && block.contains(event.relatedTarget))) {
      return;
    }
    hoverReadTarget = block;
    window.clearTimeout(hoverReadTimer);
    hoverReadTimer = window.setTimeout(function () {
      speakPageText(block.innerText);
    }, 350);
  });

  document.addEventListener("pointerout", function (event) {
    if (
      hoverReadTarget &&
      hoverReadTarget.contains(event.target) &&
      (!event.relatedTarget || !hoverReadTarget.contains(event.relatedTarget))
    ) {
      hoverReadTarget = null;
      window.clearTimeout(hoverReadTimer);
    }
  });

  document.getElementById("site-read-selected-text").addEventListener("click", function () {
    var selection = window.getSelection();
    var selectedText = selection ? selection.toString().trim() : "";
    if (!selectedText) {
      accessibilityStatus.textContent = "Select text on the page first, then choose Read selected text.";
      return;
    }
    speakPageText(selectedText);
  });

  document.getElementById("site-stop-reading").addEventListener("click", function () {
    hoverReadTarget = null;
    stopPageSpeech("Reading stopped.");
  });

  function addTopicCount(question) {
    var topic = "Course content";
    if (/\b(job|career|work|employment|interview|resume)\b/i.test(question)) {
      topic = "Careers and jobs";
    } else if (/\b(assignment|project|submit|grade|score)\b/i.test(question)) {
      topic = "Assignments";
    } else if (/\b(accessibility|screen|help|telegram|accommodation)\b/i.test(question)) {
      topic = "Support and accessibility";
    }
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    renderTeacherStats();
  }

  function renderTeacherStats() {
    teacherStats.textContent = "";
    var topics = Object.keys(topicCounts).sort(function (a, b) {
      return topicCounts[b] - topicCounts[a];
    });
    if (!topics.length) {
      teacherStats.textContent = "No questions have been asked in this browser session.";
      return;
    }
    var list = document.createElement("ul");
    topics.forEach(function (topic) {
      var item = document.createElement("li");
      item.textContent = topic + ": " + topicCounts[topic];
      list.appendChild(item);
    });
    teacherStats.appendChild(list);
  }
  renderTeacherStats();

  function setTab(tabName, focusTab) {
    var tabs = document.querySelectorAll(".site-assistant-tabs [role=tab]");
    tabs.forEach(function (tab) {
      var active = tab.id === "site-tab-" + tabName;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll(".site-assistant-tab-panel").forEach(function (panel) {
      panel.hidden = panel.id !== "site-panel-" + tabName;
    });
    if (focusTab) {
      document.getElementById("site-tab-" + tabName).focus();
    }
  }

  document.querySelector(".site-assistant-tabs").addEventListener("click", function (event) {
    var tab = event.target.closest("[role=tab]");
    if (!tab) {
      return;
    }
    setTab(tab.id.replace("site-tab-", ""), false);
  });

  document.querySelector(".site-assistant-tabs").addEventListener("keydown", function (event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".site-assistant-tabs [role=tab]"));
    var currentIndex = tabs.indexOf(document.activeElement);
    var nextIndex = (currentIndex + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    event.preventDefault();
    var nextTabName = tabs[nextIndex].id.replace("site-tab-", "");
    setTab(nextTabName, true);
  });

  function tokenize(text) {
    return String(text).toLocaleLowerCase().match(/[\p{L}\p{N}]{2,}/gu) || [];
  }

  function collectPageContent() {
    var contentRoot = document.querySelector("main#content") || document.querySelector("#content") || document.querySelector("main");
    if (!contentRoot) {
      return [];
    }

    var sourceLabel = document.title || "Page content";
    var sourceId = contentRoot.id || "main-content";
    var nodes = contentRoot.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,blockquote,td");
    var segments = [];
    Array.prototype.forEach.call(nodes, function (node, index) {
      var text = node.textContent.replace(/\s+/g, " ").trim();
      if (!text || node.closest("[hidden]")) {
        return;
      }
      if (/^H[1-6]$/.test(node.tagName)) {
        sourceLabel = text;
        if (!node.id) {
          node.id = "course-source-" + index;
        }
        sourceId = node.id;
        if (text.length >= 6) {
          segments.push({
            text: text,
            source: sourceLabel,
            sourceId: sourceId,
          });
        }
      } else if (text.length >= 30) {
        segments.push({
          text: text,
          source: sourceLabel,
          sourceId: sourceId,
        });
      }
    });
    return segments;
  }

  function findPageAnswer(question) {
    var ignored = "what which where when why how is are was were the a an and or to in on at for of with from this that about can do does tell me please explain".split(
      " "
    );
    var terms = tokenize(question).filter(function (term) {
      return ignored.indexOf(term) === -1;
    });
    if (!terms.length) {
      return [];
    }

    return collectPageContent()
      .map(function (segment) {
        var contentTerms = tokenize(segment.text);
        var matches = terms.filter(function (term) {
          return contentTerms.indexOf(term) !== -1;
        });
        return { segment: segment, score: matches.length };
      })
      .filter(function (result) {
        return result.score >= Math.min(2, terms.length);
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, 2)
      .map(function (result) {
        return result.segment;
      });
  }

  function addChatMessage(text, kind, source) {
    var message = document.createElement("p");
    message.className = "site-chat-message " + kind;
    message.textContent = text;
    message.dir = "auto";
    chatLog.appendChild(message);

    if (source) {
      var citation = document.createElement("p");
      citation.className = "site-chat-citation";
      citation.appendChild(document.createTextNode("Source: "));
      var link = document.createElement("a");
      link.href = "#" + source.sourceId;
      link.textContent = source.source;
      citation.appendChild(link);
      chatLog.appendChild(citation);
    }
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function answerTutorQuestion(question) {
    var matches = findPageAnswer(question);
    addTopicCount(question);
    if (!matches.length) {
      latestAnswer = "I couldn't find supporting text on this page, so I won't guess. You can continue with the AI bot in Telegram.";
      addChatMessage(latestAnswer, "site-chat-assistant");
    } else {
      latestAnswer = matches
        .map(function (match) {
          return match.text.length > 420 ? match.text.slice(0, 417) + "…" : match.text;
        })
        .join(" ");
      addChatMessage(latestAnswer, "site-chat-assistant", matches[0]);
    }
    if (document.getElementById("site-announce-replies").checked) {
      speakAnswer(latestAnswer);
    }
  }

  function speakAnswer(text) {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
      tutorStatus.textContent = "Speech output is not supported by this browser.";
      return;
    }
    var language = document.getElementById("site-voice-language").value;
    var voices = window.speechSynthesis.getVoices();
    var voiceMatch = voices.some(function (voice) {
      return voice.lang.toLowerCase().indexOf(language.slice(0, 2).toLowerCase()) === 0;
    });
    if (!voiceMatch) {
      tutorStatus.textContent = "No matching voice is installed. The answer remains available as text.";
      return;
    }
    var utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }

  document.getElementById("site-announce-replies").addEventListener("change", function (event) {
    if (event.target.checked && latestAnswer) {
      speakAnswer(latestAnswer);
    }
  });

  document.getElementById("site-simple-mode").addEventListener("click", function (event) {
    var enabled = root.classList.toggle("site-simple-mode");
    event.currentTarget.setAttribute("aria-pressed", String(enabled));
    event.currentTarget.textContent = "Simple mode: " + (enabled ? "On" : "Off");
  });

  tutorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var question = tutorQuestion.value.trim();
    if (!question) {
      tutorStatus.textContent = "Enter a question first.";
      tutorQuestion.focus();
      return;
    }
    addChatMessage(question, "site-chat-user");
    answerTutorQuestion(question);
    tutorQuestion.value = "";
  });

  document.getElementById("site-ai-telegram-fallback").addEventListener("click", function () {
    var question = tutorQuestion.value.trim();
    if (!question) {
      tutorStatus.textContent = "Enter a question to continue in Telegram.";
      tutorQuestion.focus();
      return;
    }
    window.open(aiTelegramUrl + "?text=" + encodeURIComponent(question), "_blank", "noopener,noreferrer");
  });

  document.getElementById("site-voice-input").addEventListener("click", function () {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      tutorStatus.textContent = "Voice input is not supported in this browser. You can type instead.";
      return;
    }
    var recognition = new Recognition();
    recognition.lang = document.getElementById("site-voice-language").value;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
      tutorQuestion.value = event.results[0][0].transcript;
      tutorStatus.textContent = "Voice captured. Review your question before sending.";
      tutorQuestion.focus();
    };
    recognition.onerror = function (event) {
      tutorStatus.textContent = "Voice input failed (" + event.error + "). You can type instead.";
    };
    recognition.start();
  });

  careerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var question = careerQuestion.value.trim();
    if (!question) {
      careerQuestion.focus();
      return;
    }
    addTopicCount("career");
    window.open(aiTelegramUrl + "?text=" + encodeURIComponent("Career question: " + question), "_blank", "noopener,noreferrer");
  });

  document.getElementById("site-job-alerts").href =
    aiTelegramUrl + "?text=" + encodeURIComponent("I would like to request job alerts on Telegram.");
  document.getElementById("site-accommodation-link").href =
    humanTelegramUrl + "?text=" + encodeURIComponent("I would like to request interview accommodations.");

  document.querySelectorAll(".site-assistant-tabs [role=tab]").forEach(function (tab) {
    tab.addEventListener("focus", function () {
      setTab(tab.id.replace("site-tab-", ""), false);
    });
  });

  document.getElementById("site-accessibility-reset").addEventListener("click", function () {
    settings.forEach(function (setting) {
      settingIndexes[setting.key] = 0;
    });
    hoverReadTarget = null;
    stopPageSpeech("Accessibility settings reset.");
    root.classList.remove("site-simple-mode");
    var simpleModeButton = document.getElementById("site-simple-mode");
    simpleModeButton.setAttribute("aria-pressed", "false");
    simpleModeButton.textContent = "Simple mode: Off";
    document.body.style.zoom = "";
    applySetting("", 0);
  });

  accessibilityGrid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-accessibility-setting]");
    if (!button) {
      return;
    }
    var key = button.getAttribute("data-accessibility-setting");
    var setting = settings.filter(function (item) {
      return item.key === key;
    })[0];
    settingIndexes[key] = (settingIndexes[key] + 1) % setting.values.length;
    applySetting(key, settingIndexes[key]);
    if (key === "read-on-hover") {
      if (settingIndexes[key]) {
        accessibilityStatus.textContent =
          "Hover over a text block to hear it. You can also select text and choose Read selected text.";
      } else {
        hoverReadTarget = null;
        stopPageSpeech("Hover reading is off.");
      }
    }
  });

  accessibilityToggle.addEventListener("click", function () {
    var open = accessibilityPanel.hidden;
    closeAllPanels();
    if (open) {
      setPanel(accessibilityPanel, accessibilityToggle, true, accessibilityTitle);
    } else {
      accessibilityToggle.focus();
    }
  });
  document.getElementById("site-accessibility-close").addEventListener("click", function () {
    setPanel(accessibilityPanel, accessibilityToggle, false, accessibilityToggle);
  });

  aiToggle.addEventListener("click", function () {
    var open = aiMenu.hidden;
    closeAllPanels();
    if (open) {
      setPanel(aiMenu, aiToggle, true, aiMenuTitle);
    } else {
      aiToggle.focus();
    }
  });
  document.getElementById("site-ai-menu-close").addEventListener("click", function () {
    setPanel(aiMenu, aiToggle, false, aiToggle);
  });
  aiTextOption.addEventListener("click", function () {
    aiMenu.hidden = true;
    aiToggle.setAttribute("aria-expanded", "false");
    setTab("tutor", false);
    setPanel(aiChat, aiToggle, true, aiChatTitle);
  });
  document.getElementById("site-ai-chat-close").addEventListener("click", function () {
    setPanel(aiChat, aiToggle, false, aiToggle);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }
    if (!accessibilityPanel.hidden) {
      setPanel(accessibilityPanel, accessibilityToggle, false, accessibilityToggle);
    } else if (!aiChat.hidden) {
      setPanel(aiChat, aiToggle, false, aiToggle);
    } else if (!aiMenu.hidden) {
      setPanel(aiMenu, aiToggle, false, aiToggle);
    }
  });
})();
