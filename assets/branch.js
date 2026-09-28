// صفحة الفرع: تعرض الدروس مقسمة حسب الموضوعات
(function () {
    const key = document.body.dataset.branch;
    const b = BRANCHES[key];
    document.title = b.name + ' | الماجيكو فى الرياضيات';
    document.getElementById('branch-unit').innerText = b.unit;
    document.getElementById('branch-title').innerText = b.name;
    document.getElementById('branch-icon').className = 'fa-solid ' + b.icon + ' text-5xl opacity-80';
    document.getElementById('branch-hero').classList.add(...b.color.split(' '));
    const box = document.getElementById('groups');
    const multi = b.groups.length > 1;
    b.groups.forEach(g => {
        let html = multi ? `<h3 class="font-extrabold text-xl text-blue-900 mt-6 mb-3 flex items-center gap-2"><i class="fa-solid fa-star text-yellow-500"></i> ${g.name}</h3>` : '';
        html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">';
        g.lessons.forEach(id => {
            const L = LESSONS[id];
            html += `
            <a href="game.html?l=${id}" class="btn-bounce glass-panel rounded-xl p-4 flex items-center gap-4 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-300">
                <div class="bg-gradient-to-br ${b.color} text-white font-extrabold text-xl rounded-xl w-16 h-16 flex items-center justify-center shrink-0 shadow" dir="ltr">${id}</div>
                <div class="text-right">
                    <h4 class="font-extrabold text-lg text-gray-800">${L.title}</h4>
                    <p class="text-xs text-gray-500 font-bold"><i class="fa-solid fa-gamepad text-blue-500"></i> 6 ألعاب - 15 سؤال لكل لعبة</p>
                </div>
                <i class="fa-solid fa-chevron-left mr-auto text-gray-400"></i>
            </a>`;
        });
        html += '</div>';
        box.insertAdjacentHTML('beforeend', html);
    });
})();
