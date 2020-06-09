(function () {
    var loader = document.getElementById('loader'),
        canvas = document.getElementById('canvas'),
        previous = '';

    var swap = function (event) {
        if (event.target.nodeName !== "A") {
            return;
        }
        var link = event.target;
        if (link.hostname !== window.location.hostname) {
            return;
        }
        event.preventDefault();
        loadUp(link.hash);
    },
        loadUp = function (target) {
            var source = document.getElementById(target.replace('#', '')),
                current = document.getElementById(previous.replace('#', ''));
            console.log(`${previous} -> ${target}`)
            if (!source) {
                return;
            }

            if (current) {
                current.classList.add("hidden");
            }

            loader.classList.remove("hidden");
            previous = target;

            setTimeout(function () {
                canvas.append(source);
                loader.classList.add("hidden");
                source.classList.remove("hidden");
            }, 500);
        };

    document.getElementById('links').addEventListener("click", swap);
    document.getElementById('index').addEventListener("click", swap);

    loadUp('index');
})();