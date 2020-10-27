import Switch from './Switcher.js';

$(document).ready(e => {
    emailjs.init("user_tXrOaKKBKX81YY2zQDbwm");

    const networkSwitch = new Switch();
    networkSwitch.subscribeObserverState((button, state) => {
        button.html(`Simular <b>${ state ? 'ativação' : 'desativação' }</b> da rede celular`);
    });
    networkSwitch.setState(false);
    networkSwitch.on("click", async (status, button, e) => {
        const emailInput = $('#email');

        const email = emailInput.val();
        if (!email.match(/.+@.*?\..+/g)) { return; }

        const result = await emailjs.send(
            'service_e4zmo2e', 
            'template_eafy4yd', 
            {
                title: `Aviso: Rede Celular foi ${status ? 'desativada' : 'ativada'}`,
                message: `O Embaralhador de sinais foi ${status ? 'desativado' : 'ativado'}!`,
                send_to: email
            }
        );
        console.log(`Email sent to ${email} with status ${result.status}`);
        emailInput.val('');
    })
    $('#wifi-blocker').append(networkSwitch.button[0]);
})