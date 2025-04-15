!function(){let t={iniciarChat:"Iniciar Chat",whatsapp:"WhatsApp",correo:"Correo electr\xf3nico",llamada:"Llamar por tel\xe9fono",escribirMensaje:"Escribe tu mensaje aqui...",atencionCliente:"Atenci\xf3n al Cliente",error:"Error:",hola:"Hola \uD83D\uDC4B, \xbfC\xf3mo podemos ayudarte?",emojis:"Emojis",noDisponible:"Lo sentimos, en este momento no podemos atender por chat. Por favor, intenta m\xe1s tarde o utiliza otro canal de comunicaci\xf3n."},e={branding:{logo:"",name:"",welcomeText:"",responseTimeText:"",poweredBy:{text:"",link:"#"}},style:{primaryColor:"",secondaryColor:"",position:"right",backgroundColor:"#ffffff",fontColor:"#333333",animation:"fadeInScale",animationDuration:"0.5s",animationDelay:"0s",darkMode:{enabled:!1}},contact:{chat:{enabled:!0,webhook:{url:"",route:""}},whatsapp:{enabled:!1,number:""},email:{enabled:!1,address:""},phone:{enabled:!1,number:""}}},a=window.ChatConfig?{branding:{...e.branding,...window.ChatConfig.branding},style:{...e.style,...window.ChatConfig.style},contact:{chat:{enabled:window.ChatConfig.contact?.chat?.enabled??e.contact.chat.enabled,webhook:{...e.contact.chat.webhook,...window.ChatConfig.contact?.chat?.webhook}},whatsapp:{...e.contact.whatsapp,...window.ChatConfig.contact?.whatsapp},email:{...e.contact.email,...window.ChatConfig.contact?.email},phone:{...e.contact.phone,...window.ChatConfig.contact?.phone}}}:e,o=`
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget.dark-mode {
            --chat--color-primary: #a67fff;
            --chat--color-secondary: #8b5fe6;
            --chat--color-background: #1a1a1a;
            --chat--color-font: #ffffff;
        }

        .n8n-chat-widget.dark-mode .chat-container {
            background-color: #1a1a1a;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .brand-header {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-message.bot {
            background-color: #2a2a2a;
            color: #ffffff;
        }

        .n8n-chat-widget.dark-mode .chat-input {
            background-color: #1a1a1a;
            border-top-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea {
            background-color: #2a2a2a;
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .n8n-chat-widget.dark-mode .theme-toggle {
            color: #ffffff;
        }

        /* Estilos para la barra de scroll en modo oscuro */
        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #444;
        }

        /* Estilos para la barra de scroll en modo claro */
        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #999;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            border-radius: 16px;
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
        }

        .n8n-chat-widget .chat-loader {
            display: none;
            align-self: flex-start;
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-loader.active {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-loader-dots {
            display: flex;
            gap: 4px;
        }

        .n8n-chat-widget .chat-loader-dot {
            width: 8px;
            height: 8px;
            background: var(--chat--color-primary);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .chat-loader-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .chat-loader-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input-buttons {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
            box-shadow: 0 2px 8px rgba(133, 79, 255, 0.15);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .emoji-button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }

        .n8n-chat-widget .emoji-button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: inherit;
            font-weight: 500;
            box-shadow: none;
            display: none;
        }

        .n8n-chat-widget .send-icon {
            width: 24px;
            height: 24px;
            fill: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: var(--chat-toggle-animation) var(--chat-toggle-animation-duration) var(--chat-toggle-animation-delay) ease-out forwards;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInRight {
            0% {
                opacity: 0;
                transform: translateX(100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInLeft {
            0% {
                opacity: 0;
                transform: translateX(-100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 0.9;
                transform: scale(1.1);
            }
            80% {
                opacity: 1;
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotateIn {
            0% {
                opacity: 0;
                transform: rotate(-180deg) scale(0.3);
            }
            100% {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 10px;
                right: 10px;
                width: 50px;
                height: 50px;
            }
            
            .n8n-chat-widget .emoji-button {
                display: none !important; /* Ocultar bot\xf3n de emojis en dispositivos m\xf3viles */
            }
        }

        .n8n-chat-widget .emoji-panel {
            position: absolute;
            bottom: 80px;
            left: 0;
            right: 0;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 0;
            display: none;
            flex-direction: column;
            width: 100%;
            max-height: 300px;
            z-index: 1001;
            transform-origin: bottom center;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        @keyframes emojiPanelIn {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes emojiPanelOut {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            animation: emojiPanelIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-panel.closing {
            display: flex;
            animation: emojiPanelOut 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
            gap: 4px;
            padding: 12px;
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 220px;
            order: 1;
        }

        .n8n-chat-widget .emoji-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 8px;
            background: rgba(133, 79, 255, 0.05);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            border-radius: 0 0 12px 12px;
            position: sticky;
            bottom: 0;
            z-index: 2;
            order: 2;
            justify-content: center;
            overflow-x: hidden;
        }

        .n8n-chat-widget .emoji-category {
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            transition: all 0.2s;
            font-size: 16px;
        }

        .n8n-chat-widget .emoji-category:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-category.active {
            background-color: rgba(133, 79, 255, 0.2);
            transform: scale(1.1);
        }

        .n8n-chat-widget .emoji-item {
            cursor: pointer;
            font-size: 18px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: background-color 0.2s;
            padding: 4px;
            min-width: 32px;
            min-height: 32px;
        }

        .n8n-chat-widget .emoji-item:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-thumb {
            background: rgba(133, 79, 255, 0.2);
            border-radius: 3px;
        }

        .n8n-chat-widget .contact-buttons-row {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            justify-content: center;
        }

        .n8n-chat-widget .contact-button {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            color: white;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .contact-button:hover {
            transform: translateY(-2px);
        }

        .n8n-chat-widget .contact-button.whatsapp {
            background: #128C7E;
        }

        .n8n-chat-widget .contact-button.email {
            background: #D44638;
        }

        .n8n-chat-widget .contact-button.phone {
            background: #4CAF50;
        }

        .n8n-chat-widget .contact-button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .theme-toggle {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 1001;
        }

        .n8n-chat-widget .theme-toggle:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .theme-icon {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget.dark-mode .theme-icon {
            fill: #ffffff;
        }

        .n8n-chat-widget .theme-toggle:hover .theme-icon {
            transform: rotate(180deg);
        }

        .n8n-chat-widget .theme-icon.light {
            display: block;
        }

        .n8n-chat-widget .theme-icon.dark {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.light {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.dark {
            display: block;
        }

        .n8n-chat-widget .resize-button {
            position: absolute;
            right: 90px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: nwse-resize;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 1001;
        }

        .n8n-chat-widget .resize-button:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .resize-button svg {
            width: 16px;
            height: 16px;
        }

        .n8n-chat-widget.dark-mode .resize-button {
            color: #ffffff;
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .resize-button {
                display: none;
            }
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-track {
            background: #2a2a2a;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
    `,n=document.createElement("link");n.rel="stylesheet",n.href="https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css",document.head.appendChild(n);let i=document.createElement("style");if(i.textContent=o,document.head.appendChild(i),window.N8NChatWidgetInitialized)return;window.N8NChatWidgetInitialized=!0;let r="",c=document.createElement("div");c.className="n8n-chat-widget",c.style.setProperty("--n8n-chat-primary-color",a.style.primaryColor),c.style.setProperty("--n8n-chat-secondary-color",a.style.secondaryColor),c.style.setProperty("--n8n-chat-background-color",a.style.backgroundColor),c.style.setProperty("--n8n-chat-font-color",a.style.fontColor),c.style.setProperty("--chat-toggle-animation",a.style.animation),c.style.setProperty("--chat-toggle-animation-duration",a.style.animationDuration),c.style.setProperty("--chat-toggle-animation-delay",a.style.animationDelay);let s=document.createElement("div");s.className=`chat-container${"left"===a.style.position?" position-left":""}`;let l=`
        <div class="brand-header">
            <img src="${a.branding.logo}" alt="${a.branding.name}">
            <span>${a.branding.name}</span>
            <button class="theme-toggle" title="Cambiar tema">
                <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="new-conversation">
                <h2 class="welcome-text">${t.hola}</h2>
                ${function e(){let o="",n="";a.contact.chat.enabled&&(o=`
            <button class="new-chat-btn chat-button">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                ${t.iniciarChat}
            </button>
            <p class="response-text">${a.branding.responseTimeText}</p>`),n='<div class="contact-buttons-row">',a.contact.whatsapp.enabled&&a.contact.whatsapp.number&&(n+=`
            <button class="contact-button whatsapp" onclick="window.open('https://wa.me/${a.contact.whatsapp.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </button>`),a.contact.email.enabled&&a.contact.email.address&&(n+=`
            <button class="contact-button email" onclick="window.open('mailto:${a.contact.email.address}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
            </button>`),a.contact.phone.enabled&&a.contact.phone.number&&(n+=`
            <button class="contact-button phone" onclick="window.open('tel:${a.contact.phone.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
            </button>`),n+="</div>";let i=a.contact.whatsapp.enabled||a.contact.email.enabled||a.contact.phone.enabled;return o+(i?n:"")}()}
            </div>
        </div>
    `,_=`
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${a.branding.logo}" alt="${a.branding.name}">
                <span>${a.branding.name}</span>
                <button class="theme-toggle" title="Cambiar tema">
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="chat-messages">
                <div class="chat-loader">
                    <div class="chat-loader-dots">
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                    </div>
                </div>
            </div>
            <div class="emoji-panel">
                <div class="emoji-categories">
                    <div class="emoji-category active" data-category="frequent">😀</div>
                    <div class="emoji-category" data-category="smileys">😊</div>
                    <div class="emoji-category" data-category="people">👍</div>
                    <div class="emoji-category" data-category="animals">🐱</div>
                    <div class="emoji-category" data-category="food">🍔</div>
                    <div class="emoji-category" data-category="travel">✈️</div>
                    <div class="emoji-category" data-category="activities">⚽</div>
                    <div class="emoji-category" data-category="objects">💡</div>
                    <div class="emoji-category" data-category="symbols">❤️</div>
                    <div class="emoji-category" data-category="flags">🏁</div>
                </div>
                <div class="emoji-content"></div>
            </div>
            <div class="chat-input">
                <div class="chat-input-buttons">
                    <button type="button" class="emoji-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7zm9-2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                        </svg>
                    </button>
                </div>
                <textarea placeholder="${t.escribirMensaje}" rows="1"></textarea>
                <div class="chat-input-buttons">
                    <button type="submit" class="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M2.01 21l20.99-9L2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat-footer">
                <a href="${a.branding.poweredBy.link}" target="_blank">${a.branding.poweredBy.text}</a>
            </div>
        </div>
    `;s.innerHTML=l+_;let d=document.createElement("button");d.className=`chat-toggle${"left"===a.style.position?" position-left":""}`,d.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`,c.appendChild(s),c.appendChild(d),document.body.appendChild(c);let $=s.querySelector(".chat-interface"),h=s.querySelector(".chat-messages"),g=s.querySelector("textarea"),p=s.querySelector('button[type="submit"]'),m=s.querySelector(".emoji-button"),b=s.querySelector(".emoji-panel"),w=s.querySelectorAll(".emoji-category"),u=s.querySelector(".emoji-content"),f=s.querySelectorAll(".close-button");if(f.forEach(t=>{t.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
        `,t.addEventListener("click",()=>{s.classList.remove("open"),setTimeout(()=>{s.style.visibility="hidden"},500)})}),a.contact.chat.enabled){let x=s.querySelector(".chat-button");x&&x.addEventListener("click",function e(){r=crypto.randomUUID();let o=[{action:"loadPreviousSession",sessionId:r,route:a.contact.chat.webhook.route,metadata:{userId:""}}],n=s.querySelector(".brand-header"),i=s.querySelector(".new-conversation");n.classList.add("fade-out"),i.classList.add("fade-out"),setTimeout(()=>{n.style.display="none",i.style.display="none",$.classList.add("fade-in"),$.classList.add("active"),fetch(a.contact.chat.webhook.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(t=>{if(!t.ok)throw Error("Error en la respuesta de la API");return t.json()}).then(e=>{let a=document.createElement("div");a.className="chat-message bot",a.innerHTML=`
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${t.atencionCliente}</strong>
                    </div>
                    <span>${Array.isArray(e)?e[0].output:e.output}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${new Date().toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} \xb7 ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                    </div>
                `,h.appendChild(a),h.scrollTop=h.scrollHeight}).catch(e=>{console.error("Error:",e);let a=document.createElement("div");a.className="chat-message bot",a.innerHTML=`
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${t.atencionCliente}</strong>
                    </div>
                    <span>${t.noDisponible}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${new Date().toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} \xb7 ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                    </div>
                `,h.appendChild(a),h.scrollTop=h.scrollHeight})},300)})}d.addEventListener("click",()=>{s.classList.contains("open")?(s.classList.remove("open"),setTimeout(()=>{s.style.visibility="hidden"},500)):(s.style.visibility="visible",s.classList.add("open"))}),p.addEventListener("click",()=>{let t=g.value.trim();t&&(C(t),g.value="")}),g.addEventListener("keypress",t=>{if("Enter"===t.key&&!t.shiftKey){t.preventDefault();let e=g.value.trim();e&&(C(e),g.value="")}}),g.addEventListener("input",()=>{g.value.trim()?(p.style.display="block",m.style.display="flex"):(p.style.display="none",m.style.display="none")});let v={frequent:["\uD83D\uDE00","\uD83D\uDE0A","\uD83D\uDC4D","❤️","\uD83D\uDC4B","\uD83D\uDE4F","\uD83D\uDE02","\uD83C\uDF89","\uD83D\uDC4F","\uD83E\uDD14","\uD83D\uDE0D"],smileys:["\uD83D\uDE00","\uD83D\uDE03","\uD83D\uDE04","\uD83D\uDE01","\uD83D\uDE06","\uD83D\uDE05","\uD83D\uDE02","\uD83E\uDD23","\uD83D\uDE0A","\uD83D\uDE07","\uD83D\uDE42","\uD83D\uDE43","\uD83D\uDE09","\uD83D\uDE0C","\uD83D\uDE0D","\uD83E\uDD70","\uD83D\uDE18","\uD83D\uDE17","\uD83D\uDE19","\uD83D\uDE1A","\uD83D\uDE0B","\uD83D\uDE1B","\uD83D\uDE1D","\uD83D\uDE1C","\uD83E\uDD2A","\uD83E\uDD28","\uD83E\uDDD0","\uD83E\uDD13","\uD83D\uDE0E","\uD83E\uDD29","\uD83E\uDD73"],people:["\uD83D\uDC4D","\uD83D\uDC4E","\uD83D\uDC4C","✌️","\uD83E\uDD1E","\uD83E\uDD1F","\uD83E\uDD18","\uD83E\uDD19","\uD83D\uDC48","\uD83D\uDC49","\uD83D\uDC46","\uD83D\uDC47","☝️","\uD83D\uDC4B","\uD83E\uDD1A","\uD83D\uDD90️","✋","\uD83D\uDD96","\uD83D\uDC4F","\uD83D\uDE4C","\uD83D\uDC50","\uD83E\uDD32","\uD83E\uDD1D","\uD83D\uDE4F","✍️"],animals:["\uD83D\uDC31","\uD83D\uDC36","\uD83D\uDC2D","\uD83D\uDC39","\uD83D\uDC30","\uD83E\uDD8A","\uD83D\uDC3B","\uD83D\uDC3C","\uD83D\uDC28","\uD83D\uDC2F","\uD83E\uDD81","\uD83D\uDC2E","\uD83D\uDC37","\uD83D\uDC38","\uD83D\uDC35","\uD83D\uDC14","\uD83D\uDC27","\uD83D\uDC26","\uD83D\uDC24","\uD83E\uDD86","\uD83E\uDD85","\uD83E\uDD89","\uD83E\uDD87","\uD83D\uDC3A","\uD83D\uDC17"],food:["\uD83C\uDF4E","\uD83C\uDF50","\uD83C\uDF4A","\uD83C\uDF4B","\uD83C\uDF4C","\uD83C\uDF49","\uD83C\uDF47","\uD83C\uDF53","\uD83C\uDF48","\uD83C\uDF52","\uD83C\uDF51","\uD83E\uDD6D","\uD83C\uDF4D","\uD83E\uDD65","\uD83E\uDD5D","\uD83C\uDF45","\uD83C\uDF46","\uD83E\uDD51","\uD83E\uDD66","\uD83E\uDD6C","\uD83E\uDD52","\uD83C\uDF36️","\uD83C\uDF3D","\uD83E\uDD55","\uD83E\uDDC4","\uD83E\uDDC5","\uD83E\uDD54","\uD83C\uDF60","\uD83E\uDD50","\uD83E\uDD6F","\uD83C\uDF5E","\uD83E\uDD56","\uD83E\uDD68","\uD83E\uDDC0","\uD83E\uDD5A","\uD83C\uDF73","\uD83E\uDDC8","\uD83E\uDD5E","\uD83E\uDDC7","\uD83E\uDD53","\uD83E\uDD69","\uD83C\uDF57","\uD83C\uDF56","\uD83E\uDDB4","\uD83C\uDF2D","\uD83C\uDF54","\uD83C\uDF5F","\uD83C\uDF55","\uD83E\uDD6A","\uD83E\uDD59","\uD83E\uDDC6","\uD83C\uDF2E","\uD83C\uDF2F","\uD83E\uDD57","\uD83E\uDD58","\uD83E\uDD6B","\uD83C\uDF5D","\uD83C\uDF5C","\uD83C\uDF72","\uD83C\uDF5B","\uD83C\uDF63","\uD83C\uDF71","\uD83E\uDD5F","\uD83E\uDDAA","\uD83C\uDF64","\uD83C\uDF59","\uD83C\uDF5A","\uD83C\uDF58","\uD83C\uDF65","\uD83E\uDD60","\uD83E\uDD6E","\uD83C\uDF62","\uD83C\uDF61","\uD83C\uDF67","\uD83C\uDF68","\uD83C\uDF66","\uD83E\uDD67","\uD83E\uDDC1","\uD83C\uDF70","\uD83C\uDF82","\uD83C\uDF6E","\uD83C\uDF6D","\uD83C\uDF6C","\uD83C\uDF6B","\uD83C\uDF7F","\uD83C\uDF69","\uD83C\uDF6A","\uD83C\uDF30","\uD83E\uDD5C","\uD83C\uDF6F","\uD83E\uDD5B","\uD83C\uDF7C","☕","\uD83C\uDF75","\uD83E\uDDC3","\uD83E\uDD64","\uD83C\uDF76","\uD83C\uDF7A","\uD83C\uDF7B","\uD83E\uDD42","\uD83C\uDF77","\uD83E\uDD43","\uD83C\uDF78","\uD83C\uDF79","\uD83E\uDDC9","\uD83C\uDF7E","\uD83E\uDDCA"],travel:["✈️","\uD83D\uDE80","\uD83D\uDE81","\uD83D\uDE82","\uD83D\uDE83","\uD83D\uDE84","\uD83D\uDE85","\uD83D\uDE86","\uD83D\uDE87","\uD83D\uDE88","\uD83D\uDE89","\uD83D\uDE8A","\uD83D\uDE9D","\uD83D\uDE9E","\uD83D\uDE8B","\uD83D\uDE8C","\uD83D\uDE8D","\uD83D\uDE8E","\uD83D\uDE90","\uD83D\uDE91","\uD83D\uDE92","\uD83D\uDE93","\uD83D\uDE94","\uD83D\uDE95","\uD83D\uDE96","\uD83D\uDE97","\uD83D\uDE98","\uD83D\uDE99","\uD83D\uDE9A","\uD83D\uDE9B","\uD83D\uDE9C","\uD83C\uDFCE️","\uD83C\uDFCD️","\uD83D\uDEF5","\uD83E\uDDBD","\uD83E\uDDBC","\uD83D\uDEFA","\uD83D\uDEB2","\uD83D\uDEF4","\uD83D\uDEF9","\uD83D\uDE8F","\uD83D\uDEE3️","\uD83D\uDEE4️","\uD83D\uDEE2️","⛽","\uD83D\uDEA8","\uD83D\uDEA5","\uD83D\uDEA6","\uD83D\uDED1","\uD83D\uDEA7"],activities:["⚽","\uD83C\uDFC0","\uD83C\uDFC8","⚾","\uD83E\uDD4E","\uD83C\uDFBE","\uD83C\uDFD0","\uD83C\uDFC9","\uD83E\uDD4F","\uD83C\uDFB1","\uD83E\uDE80","\uD83C\uDFD3","\uD83C\uDFF8","\uD83C\uDFD2","\uD83C\uDFD1","\uD83E\uDD4D","\uD83C\uDFCF","\uD83E\uDD45","⛳","\uD83E\uDE81","\uD83C\uDFA3","\uD83E\uDD3F","\uD83C\uDFBD","\uD83C\uDFBF","\uD83D\uDEF7","\uD83E\uDD4C","\uD83C\uDFAF","\uD83E\uDE82","\uD83C\uDFAE","\uD83D\uDD79️","\uD83C\uDFB2","\uD83C\uDFAD","\uD83C\uDFA8","\uD83E\uDDE9"],objects:["\uD83D\uDCA1","\uD83D\uDD26","\uD83D\uDD6F️","\uD83E\uDDEF","\uD83D\uDED2","\uD83D\uDEAC","⚰️","⚱️","\uD83C\uDFFA","\uD83D\uDD2E","\uD83D\uDCFF","\uD83E\uDDFF","\uD83D\uDC88","⚗️","\uD83D\uDD2D","\uD83D\uDD2C","\uD83D\uDD73️","\uD83D\uDC8A","\uD83D\uDC89","\uD83E\uDE78","\uD83E\uDE79","\uD83E\uDE7A","\uD83D\uDD2A","\uD83D\uDDE1️","⚔️","\uD83D\uDEE1️","\uD83D\uDEAA","\uD83E\uDE91","\uD83D\uDECF️","\uD83D\uDECB️","\uD83E\uDE92","\uD83E\uDDF4","\uD83E\uDDF7","\uD83E\uDDF9","\uD83E\uDDFA","\uD83E\uDDFB","\uD83E\uDDFC","\uD83E\uDDFD","\uD83E\uDDEF","\uD83D\uDED2"],symbols:["❤️","\uD83E\uDDE1","\uD83D\uDC9B","\uD83D\uDC9A","\uD83D\uDC99","\uD83D\uDC9C","\uD83D\uDDA4","\uD83E\uDD0D","\uD83E\uDD0E","\uD83D\uDC94","❣️","\uD83D\uDC95","\uD83D\uDC9E","\uD83D\uDC93","\uD83D\uDC97","\uD83D\uDC96","\uD83D\uDC98","\uD83D\uDC9D","\uD83D\uDC9F","☮️","✝️","☪️","\uD83D\uDD49️","☸️","✡️","\uD83D\uDD2F","\uD83D\uDD4E","☯️","☦️","\uD83D\uDED0","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","\uD83C\uDD94","⚛️"],flags:["\uD83C\uDFC1","\uD83D\uDEA9","\uD83C\uDF8C","\uD83C\uDFF4","\uD83C\uDFF3️","\uD83C\uDFF3️‍\uD83C\uDF08","\uD83C\uDFF4‍☠️"]};function y(t){u.innerHTML="";let e=v[t];e.forEach(t=>{let e=document.createElement("div");e.className="emoji-item",e.textContent=t,e.addEventListener("click",()=>{(function t(e){let a=g.selectionStart,o=g.value.substring(0,a),n=g.value.substring(a);g.value=o+e+n,g.selectionStart=a+e.length,g.selectionEnd=a+e.length,g.focus(),p.style.display="block",b.classList.remove("active")})(t)}),u.appendChild(e)})}function k(){let t=document.querySelectorAll(".resize-button"),e=document.querySelector(".chat-container");if(!t.length||!e)return;let a={width:"380px",height:"600px"},o={width:"600px",height:"800px"},n=!1;function i(){let t=window.innerWidth,e=window.innerHeight;return{width:Math.floor(.8*t),height:Math.floor(.8*e)}}function r(){if(window.innerWidth<=768)return;let r=i();if(n)e.style.width=a.width,e.style.height=a.height;else{let c=Math.min(parseInt(o.width),r.width),s=Math.min(parseInt(o.height),r.height);e.style.width=c+"px",e.style.height=s+"px"}n=!n,t.forEach(t=>{let e=t.querySelector("svg");e.innerHTML='<path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>'})}window.addEventListener("resize",()=>{if(window.innerWidth<=768)e.style.width="100%",e.style.height="100%",n=!1;else if(n){let t=i(),r=Math.min(parseInt(o.width),t.width),c=Math.min(parseInt(o.height),t.height);e.style.width=r+"px",e.style.height=c+"px"}else e.style.width=a.width,e.style.height=a.height}),t.forEach(t=>{t.addEventListener("click",r)})}y("frequent"),w.forEach(t=>{t.addEventListener("click",()=>{w.forEach(t=>t.classList.remove("active")),t.classList.add("active"),y(t.dataset.category)})}),m.addEventListener("click",()=>{b.classList.toggle("active"),b.classList.contains("active")&&y("frequent")}),document.addEventListener("click",t=>{b.contains(t.target)||m.contains(t.target)||b.classList.remove("active")}),k();let z=s.querySelector(".chat-button");async function C(e){let o=s.querySelector(".chat-messages"),n={message:e,timestamp:new Date().toISOString()},i=document.createElement("div");i.className="chat-message user",i.innerHTML=`
            <span>${e}</span>
            <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                <span>${new Date().toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} \xb7 ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
            </div>
        `,o.appendChild(i),o.scrollTop=o.scrollHeight;let r=document.createElement("div");r.className="chat-message bot",r.innerHTML=`
            <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${t.atencionCliente}</strong>
            </div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `,o.appendChild(r),o.scrollTop=o.scrollHeight;try{let c=await fetch(a.contact.chat.webhook.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),l=await c.json();r.remove();let _=document.createElement("div");_.className="chat-message bot",_.innerHTML=`
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${t.atencionCliente}</strong>
                </div>
                <span>${Array.isArray(l)?l[0].output:l.output}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${new Date().toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} \xb7 ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
            `,o.appendChild(_),o.scrollTop=o.scrollHeight}catch(d){r.remove(),console.error("Error:",d);let $=document.createElement("div");$.className="chat-message bot",$.innerHTML=`
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${t.atencionCliente}</strong>
                </div>
                <span>${t.noDisponible}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${new Date().toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} \xb7 ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
            `,o.appendChild($),o.scrollTop=o.scrollHeight}}z&&z.addEventListener("click",()=>{setTimeout(k,100)}),!function t(){let e=a.style.darkMode;if(e&&e.enabled){let o=window.matchMedia("(prefers-color-scheme: dark)"),n=s.querySelectorAll(".theme-toggle"),i=document.querySelector(".n8n-chat-widget");function r(t){t?(i.classList.add("dark-mode"),localStorage.setItem("chatTheme","dark")):(i.classList.remove("dark-mode"),localStorage.setItem("chatTheme","light"))}o.addListener(t=>{localStorage.getItem("chatTheme")||r(t.matches)}),n.forEach(t=>{t.innerHTML=`
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                `,t.addEventListener("click",()=>{let t=i.classList.contains("dark-mode");r(!t)})});let c=localStorage.getItem("chatTheme");c?r("dark"===c):r(o.matches)}}()}(),document.addEventListener("DOMContentLoaded",()=>{if(window.ChatWidgetConfig){let t=document.createElement("div");t.className="n8n-chat-widget",t.style.setProperty("--n8n-chat-primary-color",window.ChatWidgetConfig.style.primaryColor),t.style.setProperty("--n8n-chat-secondary-color",window.ChatWidgetConfig.style.secondaryColor),t.style.setProperty("--n8n-chat-background-color",window.ChatWidgetConfig.style.backgroundColor),t.style.setProperty("--n8n-chat-font-color",window.ChatWidgetConfig.style.fontColor),t.style.setProperty("--chat-toggle-animation",window.ChatWidgetConfig.style.animation),t.style.setProperty("--chat-toggle-animation-duration",window.ChatWidgetConfig.style.animationDuration),t.style.setProperty("--chat-toggle-animation-delay",window.ChatWidgetConfig.style.animationDelay),document.body.appendChild(t),window.ChatWidget=new ChatWidget(window.ChatWidgetConfig)}else console.error("La configuraci\xf3n del chat no est\xe1 disponible")});