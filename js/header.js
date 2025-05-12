const navLinks = document.querySelectorAll(".header__link");
const currentPage = window.location.pathname;

navLinks.forEach(link => {
  if (link.href.includes(`${currentPage}`)) {
    link.classList.add("active");
  }
});

// Mobile navigation toggle functionality
const navToggle = document.querySelector(".header__nav--toggle");
const navMenu = document.querySelector(".header__nav-links");
const dropdownParents = document.querySelectorAll(".header__dropdown");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function(e) {
    e.stopPropagation();
    navMenu.classList.toggle("show-mobile-nav");
    navToggle.classList.toggle("active");
  });

  // Handle mobile dropdown menus
  if (window.innerWidth < 768) {
    dropdownParents.forEach(parent => {
      const dropdownLink = parent.querySelector(".header__link");
      const dropdownMenu = parent.querySelector(".header__dropdown-menu");

      if (dropdownLink && dropdownMenu) {
        dropdownLink.addEventListener("click", function(e) {
          // Only for mobile view
          if (window.innerWidth < 768 && navMenu.classList.contains("show-mobile-nav")) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";

            // Close other open dropdowns
            dropdownParents.forEach(otherParent => {
              if (otherParent !== parent) {
                const otherMenu = otherParent.querySelector(".header__dropdown-menu");
                if (otherMenu) otherMenu.style.display = "none";
              }
            });
          }
        });
      }
    });
  }

  // Close mobile menu when clicking on a non-dropdown link
  navMenu.querySelectorAll("a:not(.header__dropdown > .header__link)").forEach(link => {
    link.addEventListener("click", function() {
      navMenu.classList.remove("show-mobile-nav");
      navToggle.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("show-mobile-nav")) {
      navMenu.classList.remove("show-mobile-nav");
      navToggle.classList.remove("active");

      // Also close any open dropdown menus
      dropdownParents.forEach(parent => {
        const dropdownMenu = parent.querySelector(".header__dropdown-menu");
        if (dropdownMenu) dropdownMenu.style.display = "";
      });
    }
  });

  // Handle window resize
  window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) {
      navMenu.classList.remove("show-mobile-nav");
      navToggle.classList.remove("active");

      // Reset dropdown menu displays
      dropdownParents.forEach(parent => {
        const dropdownMenu = parent.querySelector(".header__dropdown-menu");
        if (dropdownMenu) dropdownMenu.style.display = "";
      });
    }
  });
}

// Notification functionality
const notificationIcon = document.getElementById("notification-icon");
const notificationDropdown = document.getElementById("notification-dropdown");
const markAllReadButton = document.getElementById("mark-all-read");

if (notificationIcon && notificationDropdown) {
  notificationIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    notificationDropdown.style.display = notificationDropdown.style.display === "block" ? "none" : "block";

    // Hide help tooltip if open
    if (helpTooltip) {
      helpTooltip.style.display = "none";
    }
  });
}

// Add this to close the dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (notificationDropdown && notificationDropdown.style.display === 'block') {
    if (!notificationDropdown.contains(e.target) && e.target !== notificationIcon) {
      notificationDropdown.style.display = 'none';
    }
  }
});

// Help functionality
const helpIcon = document.getElementById("help-icon");
const helpTooltip = document.getElementById("help-tooltip");
const helpSizing = document.getElementById("help-sizing");
const helpOrders = document.getElementById("help-orders");
const helpChat = document.getElementById("help-chat");

if (helpIcon && helpTooltip) {
  helpIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    helpTooltip.style.display = helpTooltip.style.display === "block" ? "none" : "block";

    // Hide notification dropdown if open
    if (notificationDropdown) {
      notificationDropdown.style.display = "none";
    }
  });

  if (helpSizing) {
    helpSizing.addEventListener("click", function() {
      // Redirect to sizing guide page
      openSizingGuide();
    });
  }

  if (helpOrders) {
    helpOrders.addEventListener("click", function() {
      // Redirect to FAQs page
      openFAQs();
    });
  }

  if (helpChat) {
    helpChat.addEventListener("click", function(e) {
      // Launch AI chat assistant
      launchAIChat(e);
    });
  }
}

// Close dropdowns when clicking elsewhere
document.addEventListener("click", function() {
  if (notificationDropdown) {
    notificationDropdown.style.display = "none";
  }
  if (helpTooltip) {
    helpTooltip.style.display = "none";
  }
});

// Prevent clicks inside dropdowns from closing them
if (notificationDropdown) {
  notificationDropdown.addEventListener("click", function(e) {
    e.stopPropagation();
  });
}

if (helpTooltip) {
  helpTooltip.addEventListener("click", function(e) {
    e.stopPropagation();
  });
}

// Placeholder for AI chat functionality
function launchAIChat(e) {
  // Prevent default scrolling behavior
  if (e) e.preventDefault();

  // Remove any existing chat popup first
  const existingPopup = document.querySelector('.ai-chat-popup');
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  // Create new chat popup
  const chatPopup = document.createElement("div");
  chatPopup.classList.add("ai-chat-popup");
  chatPopup.innerHTML = `
    <div class="chat-header">
      <h3>AI Assistant</h3>
      <button class="close-chat">&times;</button>
    </div>
    <div class="chat-messages">
      <div class="message bot">
        Hello! I'm your AI assistant for Kunozulkhair Tailoring Shop. How can I help you today?
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Type your question here..." id="chat-message-input" />
      <button id="send-message">Send</button>
    </div>
  `;

  // Add the chat popup to the body
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    document.body.appendChild(chatPopup);
  });

  // Add event listener to close button
  const closeButton = chatPopup.querySelector(".close-chat");
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      document.body.removeChild(chatPopup);
    });
  }

  // Add event listener for sending messages
  const sendButton = chatPopup.querySelector("#send-message");
  const chatInput = chatPopup.querySelector("#chat-message-input");
  const chatMessages = chatPopup.querySelector(".chat-messages");

  if (sendButton && chatInput) {
    // Function to handle sending messages
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        // Add user message to chat
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user');
        userMessageElement.textContent = message;
        chatMessages.appendChild(userMessageElement);

        // Clear input
        chatInput.value = '';

        // Scroll within the chat container only
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI response after a short delay
        setTimeout(() => {
          const aiResponse = generateAIResponse(message);
          const botMessageElement = document.createElement('div');
          botMessageElement.classList.add('message', 'bot');
          botMessageElement.textContent = aiResponse;
          chatMessages.appendChild(botMessageElement);

          // Scroll within the chat container only
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      }
    };

    // Add event listeners
    sendButton.addEventListener("click", function(e) {
      e.preventDefault(); // Prevent any default behavior
      sendMessage();
    });

    chatInput.addEventListener("keypress", function(e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission behavior
        sendMessage();
      }
    });

    // Focus input when popup opens, but use setTimeout to prevent scrolling issues
    setTimeout(() => {
      chatInput.focus();
    }, 100);
  }

  // Add styles for the chat popup
  const styleId = 'ai-chat-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .ai-chat-popup {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 450px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        z-index: 1001;
        overflow: hidden;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
        border-radius: 10px 10px 0 0;
      }

      .chat-header h3 {
        margin: 0;
        font-size: 16px;
      }

      .close-chat {
        background: none;
        border: none;
        color: var(--clr-neutral-900);
        font-size: 20px;
        cursor: pointer;
      }

      .chat-messages {
        flex-grow: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }

      .message {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        max-width: 80%;
      }

      .message.bot {
        background-color: #f0f0f0;
        align-self: flex-start;
      }

      .message.user {
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
        align-self: flex-end;
        margin-left: auto;
      }

      .chat-input {
        display: flex;
        padding: 10px;
        border-top: 1px solid #eee;
      }

      .chat-input input {
        flex-grow: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .chat-input button {
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
        border: none;
        padding: 8px 15px;
        margin-left: 10px;
        border-radius: 4px;
        cursor: pointer;
      }
    `;

    document.head.appendChild(style);
  }
}

// Simple AI response generator (just for demonstration)
function generateAIResponse(userMessage) {
  userMessage = userMessage.toLowerCase();

  if (userMessage.includes('size') || userMessage.includes('measurement')) {
    return "For accurate sizing, we recommend visiting our sizing guide page. You can also book an appointment for a professional measurement session.";
  }
  else if (userMessage.includes('delivery') || userMessage.includes('shipping')) {
    return "We offer standard delivery (3-5 business days) and express delivery (1-2 business days) options. Shipping costs depend on your location.";
  }
  else if (userMessage.includes('return') || userMessage.includes('exchange')) {
    return "We accept returns and exchanges within 14 days of purchase. Items must be unworn and in their original condition.";
  }
  else if (userMessage.includes('payment') || userMessage.includes('pay')) {
    return "We accept cash and digital payment methods like GCash. All payments are securely processed.";
  }
  else if (userMessage.includes('custom') || userMessage.includes('tailor')) {
    return "Our custom tailoring service allows you to design your own clothing. Book an appointment to discuss your requirements with our expert tailors.";
  }
  else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
    return "Hello! How can I assist you with your tailoring needs today?";
  }
  else {
    return "Thank you for your question. For more specific information, please visit our detailed FAQ page or contact our customer service team directly.";
  }
}

function openFAQs() {
  // Remove any existing FAQs modal
  const existingFAQs = document.querySelector('.faqs-modal');
  if (existingFAQs) {
    document.body.removeChild(existingFAQs);
  }

  // Create FAQs modal
  const faqsModal = document.createElement("div");
  faqsModal.classList.add("faqs-modal");

  faqsModal.innerHTML = `
    <div class="faqs-content">
      <div class="faqs-header">
        <h2>Frequently Asked Questions</h2>
        <button class="close-faqs">&times;</button>
      </div>
      <div class="faqs-body">
        <div class="faqs-tabs">
          <button class="faq-tab-btn active" data-tab="general">General</button>
          <button class="faq-tab-btn" data-tab="services">Services</button>
          <button class="faq-tab-btn" data-tab="orders">Orders</button>
          <button class="faq-tab-btn" data-tab="appointments">Appointments</button>
        </div>

        <div class="faq-tab-content" id="general-content">
          <div class="faq-item">
            <div class="faq-question">What services does Kunozulkhair Tailoring Shop offer?</div>
            <div class="faq-answer">
              <p>We offer a wide range of tailoring services including custom dressmaking, alterations and repairs, embroidery services, bridal and formal wear, curtains and home textiles, and casual and everyday dresses. Our skilled tailors can create or modify any garment to your specifications.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Where are you located?</div>
            <div class="faq-answer">
              <p>Our shop is located at Datu Liwa Candao Street, Cotabato City. You can find detailed directions on our Contact page.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">What are your business hours?</div>
            <div class="faq-answer">
              <p>We are open Monday to Saturday from 9:00 AM to 6:00 PM, and close on Sunday.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Do I need an appointment to visit your shop?</div>
            <div class="faq-answer">
              <p>While walk-ins are welcome for simple inquiries and small alterations, we recommend booking an appointment for custom tailoring, fittings, and consultations to ensure we can give you our full attention. You can book appointments through our website or by calling us.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">What payment methods do you accept?</div>
            <div class="faq-answer">
              <p>We accept cash and a digital payment method with GCash.</p>
            </div>
          </div>
        </div>

        <div class="faq-tab-content" id="services-content" style="display: none;">
          <div class="faq-item">
            <div class="faq-question">How long does it take to make a custom dress?</div>
            <div class="faq-answer">
              <p>The timeframe depends on the complexity of the design, fabric availability, and our current workload. Simple dresses typically take 1-2 weeks, while more complex designs like formal or bridal wear may take 3-6 weeks. We'll provide a specific timeline during your consultation.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Do you provide the fabric or should I bring my own?</div>
            <div class="faq-answer">
              <p>We have a selection of good-quality fabrics available in our shop, but you're also welcome to bring your own fabric. If you're looking for something specific that we don't have in stock, we can help source it for you.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">What alterations services do you offer?</div>
            <div class="faq-answer">
              <p>We offer a complete range of alterations including hemming, taking in or letting out seams, sleeve adjustments, zipper replacements, and resizing. We can alter almost any garment including dresses, pants, shirts, jackets, and formal wear.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">How much do your services cost?</div>
            <div class="faq-answer">
              <p>Our pricing varies depending on the service and complexity. Basic alterations start at ₱100, while custom dresses range from ₱700 for simple designs to ₱5,000+ for formal wear. Embroidery is priced based on size and complexity. We provide detailed quotes after consultation.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Can you replicate a design from a picture?</div>
            <div class="faq-answer">
              <p>Yes! We can create garments based on pictures or designs you bring in. Our skilled tailors can adapt designs to your measurements and preferences. Please note that while we can create similar styles, exact replicas of designer pieces may differ slightly due to fabric and construction differences.</p>
            </div>
          </div>
        </div>

        <div class="faq-tab-content" id="orders-content" style="display: none;">
          <div class="faq-item">
            <div class="faq-question">How do I place an order?</div>
            <div class="faq-answer">
              <p>You can place orders through our website, by visiting our shop, or by calling us. For custom garments, we recommend booking an appointment for a consultation where we can discuss your requirements in detail.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Can I make changes to my order after it's been placed?</div>
            <div class="faq-answer">
              <p>Yes, but the ability to make changes depends on the stage of production. Changes requested early in the process are usually easier to accommodate. Once cutting or sewing has begun, changes may incur additional costs or may not be possible. Please contact us as soon as possible if you need to make changes.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">What is your return/exchange policy?</div>
            <div class="faq-answer">
              <p>For ready-made items, we accept returns within 7 days of purchase if the item is unworn and in original condition with tags attached. Custom-made items cannot be returned but we offer free adjustments within 14 days of delivery if the garment doesn't fit as expected.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">How can I track my order?</div>
            <div class="faq-answer">
              <p>You can track your order status by logging into your account on our website or by contacting us directly with your order number. For custom orders, we'll keep you updated on significant milestones and notify you when your garment is ready for fitting or pickup.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Do you offer delivery services?</div>
            <div class="faq-answer">
              <p>Yes, we offer delivery within Cotabato City for a small fee. For locations outside the city, we can arrange shipping through courier services. Delivery times and costs vary depending on location.</p>
            </div>
          </div>
        </div>

        <div class="faq-tab-content" id="appointments-content" style="display: none;">
          <div class="faq-item">
            <div class="faq-question">How do I schedule an appointment?</div>
            <div class="faq-answer">
              <p>You can schedule appointments through our website's appointment booking system, by calling our shop, or by visiting us in person. Online booking is recommended as it allows you to see all available time slots.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">What should I bring to my appointment?</div>
            <div class="faq-answer">
              <p>For custom garments, bring any reference images, fabric samples, or specific ideas you have. For alterations, bring the garment that needs modification. For fittings, wear appropriate undergarments that you'll wear with the final garment. If you have a specific event date, please share this information so we can plan accordingly.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Can I reschedule or cancel my appointment?</div>
            <div class="faq-answer">
              <p>Yes, you can reschedule or cancel your appointment through our website or by calling us. We appreciate at least 24 hours' notice for cancellations to allow us to offer the time slot to other customers.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">How long does a typical appointment take?</div>
            <div class="faq-answer">
              <p>Initial consultations typically take 30-60 minutes depending on the complexity of your requirements. Fittings usually take 15-30 minutes, and final pickup appointments are typically quick, around 10-15 minutes unless additional adjustments are needed.</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Do you charge for consultations?</div>
            <div class="faq-answer">
              <p>Initial consultations are free of charge. However, for detailed design consultations that include sketching and fabric recommendations, we may charge a design fee which can be applied toward your order if you proceed with the project.</p>
            </div>
          </div>
        </div>

        <div class="faq-contact">
          <p>Didn't find what you're looking for? Contact us directly:</p>
          <a href="contact.html" class="faq-contact-btn">Contact Us</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(faqsModal);

  // Add event listeners
  const closeBtn = faqsModal.querySelector('.close-faqs');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(faqsModal);
    });
  }

  // FAQ item toggle functionality
  const faqQuestions = faqsModal.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      faqItem.classList.toggle('active');

      // Close other open FAQ items
      faqQuestions.forEach(q => {
        if (q !== this && q.parentElement.classList.contains('active')) {
          q.parentElement.classList.remove('active');
        }
      });
    });
  });

  // Tab switching functionality
  const tabBtns = faqsModal.querySelectorAll('.faq-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Hide all tab content
      document.querySelectorAll('.faq-tab-content').forEach(content => {
        content.style.display = 'none';
      });

      // Show the corresponding tab content
      const tabToShow = this.getAttribute('data-tab');
      document.getElementById(`${tabToShow}-content`).style.display = 'block';
    });
  });

  // Close modal when clicking outside
  faqsModal.addEventListener('click', function(e) {
    if (e.target === faqsModal) {
      document.body.removeChild(faqsModal);
    }
  });

  // Add styles for FAQs
  const styleId = 'faqs-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .faqs-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
      }

      .faqs-content {
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .faqs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: var(--clr-primary);
        color: black;
      }

      .faqs-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      .close-faqs {
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: black;
      }

      .faqs-body {
        padding: 20px;
        overflow-y: auto;
        max-height: calc(90vh - 60px);
      }

      .faqs-tabs {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 2px solid #eee;
        flex-wrap: wrap;
      }

      .faq-tab-btn {
        padding: 10px 15px;
        border: none;
        background: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s;
      }

      .faq-tab-btn.active {
        color: var(--clr-primary);
        border-bottom: 2px solid var(--clr-primary);
      }

      .faq-item {
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
      }

      .faq-question {
        padding: 15px;
        background-color: #f9f9f9;
        font-weight: 500;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s;
      }

      .faq-question:hover {
        background-color: #f0f0f0;
      }

      .faq-question::after {
        content: '+';
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.2rem;
        transition: transform 0.3s;
      }

      .faq-item.active .faq-question::after {
        transform: translateY(-50%) rotate(45deg);
      }

      .faq-answer {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .faq-item.active .faq-answer {
        padding: 15px;
        max-height: 500px;
      }

      .faq-answer p {
        margin: 0;
        line-height: 1.6;
      }

      .faq-contact {
        margin-top: 30px;
        text-align: center;
        padding: 15px;
        background-color: #f0f0f0;
        border-radius: 8px;
      }

      .faq-contact p {
        margin-bottom: 10px;
      }

      .faq-contact-btn {
        display: inline-block;
        background-color: var(--clr-primary);
        color: black;
        padding: 8px 15px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .faqs-content {
          width: 95%;
        }

        .faqs-tabs {
          justify-content: center;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Function for sizing guide
function openSizingGuide() {
  // Remove any existing sizing guide
  const existingSizingGuide = document.querySelector('.sizing-guide-modal');
  if (existingSizingGuide) {
    document.body.removeChild(existingSizingGuide);
  }

  // Create sizing guide modal
  const sizingGuideModal = document.createElement("div");
  sizingGuideModal.classList.add("sizing-guide-modal");

  sizingGuideModal.innerHTML = `
    <div class="sizing-guide-content">
      <div class="sizing-guide-header">
        <h2>Tailoring Measurement Guide</h2>
        <button class="close-sizing-guide">&times;</button>
      </div>
      <div class="sizing-guide-body">
        <p class="sizing-intro">Use this guide to take accurate measurements for custom tailoring. For best results, have someone else measure you while standing in a natural position.</p>

        <div class="measurement-tabs">
          <button class="tab-btn active" data-tab="women">Women</button>
          <button class="tab-btn" data-tab="men">Men</button>
        </div>

        <div class="tab-content" id="women-content">
          <div class="size-chart">
            <h3>Women's Standard Sizes (in inches)</h3>
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust</th>
                  <th>Waist</th>
                  <th>Hips</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS (0-2)</td>
                  <td>31-32</td>
                  <td>24-25</td>
                  <td>34-35</td>
                </tr>
                <tr>
                  <td>S (4-6)</td>
                  <td>33-34</td>
                  <td>26-27</td>
                  <td>36-37</td>
                </tr>
                <tr>
                  <td>M (8-10)</td>
                  <td>35-36</td>
                  <td>28-29</td>
                  <td>38-39</td>
                </tr>
                <tr>
                  <td>L (12-14)</td>
                  <td>37-39</td>
                  <td>30-32</td>
                  <td>40-42</td>
                </tr>
                <tr>
                  <td>XL (16-18)</td>
                  <td>40-42</td>
                  <td>33-35</td>
                  <td>43-45</td>
                </tr>
                <tr>
                  <td>XXL (20-22)</td>
                  <td>43-45</td>
                  <td>36-38</td>
                  <td>46-48</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="measurement-guide-section">
            <h3>How to Measure</h3>
            <div class="measurement-item">
              <h4>Bust</h4>
              <p>Measure around the fullest part of your bust, keeping the tape measure parallel to the floor.</p>
            </div>
            <div class="measurement-item">
              <h4>Waist</h4>
              <p>Measure around your natural waistline, at the narrowest part of your torso.</p>
            </div>
            <div class="measurement-item">
              <h4>Hips</h4>
              <p>Measure around the fullest part of your hips, usually about 8 inches below your waistline.</p>
            </div>
            <div class="measurement-item">
              <h4>Shoulder Width</h4>
              <p>Measure from the edge of one shoulder to the other, across the back.</p>
            </div>
            <div class="measurement-item">
              <h4>Sleeve Length</h4>
              <p>Measure from shoulder edge to wrist with arm slightly bent.</p>
            </div>
          </div>
        </div>

        <div class="tab-content" id="men-content" style="display: none;">
          <div class="size-chart">
            <h3>Men's Standard Sizes (in inches)</h3>
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Hips</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XS</td>
                  <td>34-36</td>
                  <td>28-30</td>
                  <td>34-36</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>36-38</td>
                  <td>30-32</td>
                  <td>36-38</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>38-40</td>
                  <td>32-34</td>
                  <td>38-40</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>40-42</td>
                  <td>34-36</td>
                  <td>40-42</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>42-44</td>
                  <td>36-38</td>
                  <td>42-44</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>44-46</td>
                  <td>38-40</td>
                  <td>44-46</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="measurement-guide-section">
            <h3>How to Measure</h3>
            <div class="measurement-item">
              <h4>Chest</h4>
              <p>Measure around the fullest part of your chest, keeping the tape measure parallel to the floor.</p>
            </div>
            <div class="measurement-item">
              <h4>Waist</h4>
              <p>Measure around your natural waistline, at the level of your navel.</p>
            </div>
            <div class="measurement-item">
              <h4>Neck</h4>
              <p>Measure around the base of your neck, where a shirt collar would sit.</p>
            </div>
            <div class="measurement-item">
              <h4>Shoulder Width</h4>
              <p>Measure from the edge of one shoulder to the other, across the back.</p>
            </div>
            <div class="measurement-item">
              <h4>Sleeve Length</h4>
              <p>Measure from shoulder edge to wrist with arm slightly bent.</p>
            </div>
          </div>
        </div>

        <div class="measuring-tips">
          <h3>Tips for Accurate Measurements</h3>
          <ul>
            <li>Use a fabric measuring tape, not a metal one.</li>
            <li>Keep the measuring tape snug but not tight.</li>
            <li>Wear light clothing when measuring.</li>
            <li>Stand naturally with arms relaxed at your sides.</li>
            <li>For the most accurate measurements, consider booking an appointment for professional measuring at our shop.</li>
          </ul>
        </div>

        <div class="sizing-cta">
          <p>Need help with your measurements? Visit our shop or book an appointment for professional measuring!</p>
          <a href="appointments.html" class="sizing-guide-btn">Book Appointment</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(sizingGuideModal);

  // Add event listeners
  const closeBtn = sizingGuideModal.querySelector('.close-sizing-guide');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(sizingGuideModal);
    });
  }

  // Tab switching functionality
  const tabBtns = sizingGuideModal.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Hide all tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });

      // Show the corresponding tab content
      const tabToShow = this.getAttribute('data-tab');
      document.getElementById(`${tabToShow}-content`).style.display = 'block';
    });
  });

  // Close modal when clicking outside
  sizingGuideModal.addEventListener('click', function(e) {
    if (e.target === sizingGuideModal) {
      document.body.removeChild(sizingGuideModal);
    }
  });

  // Add styles for sizing guide
  const styleId = 'sizing-guide-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .sizing-guide-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
      }

      .sizing-guide-content {
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .sizing-guide-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: var(--clr-primary);
        color: black;
      }

      .sizing-guide-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      .close-sizing-guide {
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: black;
      }

      .sizing-guide-body {
        padding: 20px;
        overflow-y: auto;
        max-height: calc(90vh - 60px);
      }

      .sizing-intro {
        margin-bottom: 20px;
      }

      .measurement-tabs {
        display: flex;
        margin-bottom: 20px;
        border-bottom: 2px solid #eee;
      }

      .tab-btn {
        padding: 10px 20px;
        border: none;
        background: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s;
      }

      .tab-btn.active {
        color: var(--clr-primary);
        border-bottom: 2px solid var(--clr-primary);
      }

      .size-chart {
        margin-bottom: 30px;
      }

      .size-chart table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
      }

      .size-chart table th, .size-chart table td {
        border: 1px solid #ddd;
        padding: 8px 12px;
        text-align: center;
      }

      .size-chart table th {
        background-color: #f5f5f5;
      }

      .measurement-guide-section {
        margin-bottom: 30px;
      }

      .measurement-item {
        margin-bottom: 15px;
      }

      .measurement-item h4 {
        margin-bottom: 5px;
        color: var(--clr-secondary);
      }

      .measuring-tips {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .measuring-tips ul {
        margin-top: 10px;
        padding-left: 20px;
      }

      .measuring-tips li {
        margin-bottom: 8px;
      }

      .sizing-cta {
        background-color: #f0f0f0;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
      }

      .sizing-guide-btn {
        display: inline-block;
        background-color: var(--clr-primary);
        color: black;
        padding: 8px 15px;
        margin-top: 10px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .sizing-guide-content {
          width: 95%;
        }

        .measurement-tabs {
          flex-wrap: wrap;
        }

        .size-chart {
          overflow-x: auto;
        }
      }
    `;

    document.head.appendChild(style);
  }
}
