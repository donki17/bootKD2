$(document).ready(function() {
    $(".element").draggable({
        revert: "invalid",
        cursor: "grabbing"
    });

    // Сделать target зоной для сбрасывания
    $("#target").droppable({
        accept: ".element",
        drop: function(event, ui) {
            var droppedElement = ui.draggable;
            var elementClass = droppedElement.attr('class').split(' ')[1]; // Получаем класс element1 или element2
            var elementBackgroundColor = droppedElement.css('background-color');
            var targetBackgroundColor = $(this).css('background-color');

            // Смешивание цветов (простой вариант - наложение с прозрачностью)
            // Более сложный вариант - конвертация в RGB и смешивание компонентов
            let mixedColor = mixColors(targetBackgroundColor, elementBackgroundColor);
            $(this).css('background-color', mixedColor);

            droppedElement.hide();

            // Вывод информации
            $("#note").text("Класс: " + elementClass + ", Цвет element: " + elementBackgroundColor + ", Цвет target: " + mixedColor);
        }
    });

    function hexToRgb(hex) {
        // Remove the hash if it exists
        hex = hex.replace("#", "");

        // Parse the hex values for red, green, and blue
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Return the RGB values as an object
        return { r, g, b };
    }

    function mixColors(color1, color2) {
        let rgb1 = colorToRgb(color1);
        let rgb2 = colorToRgb(color2);

        let mixedR = Math.round((rgb1.r + rgb2.r) / 2);
        let mixedG = Math.round((rgb1.g + rgb2.g) / 2);
        let mixedB = Math.round((rgb1.b + rgb2.b) / 2);

        return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
    }

    function colorToRgb(color) {
        // Check if the color is already in RGB format
        if (color.startsWith("rgb")) {
            // Extract the RGB values from the string
            const values = color.substring(color.indexOf("(") + 1, color.indexOf(")")).split(",");
            return {
                r: parseInt(values[0]),
                g: parseInt(values[1]),
                b: parseInt(values[2])
            };
        } else if (color.startsWith("#")) {
            // Convert the hex code to RGB
            return hexToRgb(color.slice(1));
        } else {
            // Handle named colors (e.g., "red", "blue")
            // You might need a more comprehensive mapping for all named colors
            // For simplicity, we'll just return black for unknown colors
            return { r: 0, g: 0, b: 0 };
        }
    }
});