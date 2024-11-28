const baseURL = 'http://jenkins-ops.tools.ilabank.internal';
const inputConfigs = {
    'change-email': [
        { name: 'OLD_EMAIL', label: 'OLD_EMAIL', type: 'email', placeholder: 'e.g., user@example.com' },
        { name: 'NEW_EMAIL', label: 'NEW_EMAIL', type: 'email', placeholder: 'e.g., user@example.com' },
        { name: 'CASE_ID', label: 'CASE_ID', type: 'text', placeholder: 'e.g., 645677867' }
    ],
    'delete-ping-id': [
        { name: 'EMAIL', label: 'EMAIL', type: 'email', placeholder: 'e.g., user@example.com' },
        { name: 'CASE_ID', label: 'CASE_ID', type: 'text', placeholder: 'e.g., 645677867' }
    ],
    'change-default-unit-id': [
        { name: 'EMAIL', label: 'EMAIL', type: 'email', placeholder: 'e.g., user@example.com' },
        { 
            name: 'UNIT_ID', 
            label: 'UNIT_ID', 
            type: 'select',
            options: ['1', '3', '4'],
            placeholder: 'Select Unit ID' 
        },
        { name: 'CASE_ID', label: 'CASE_ID', type: 'text', placeholder: 'e.g., 645677867' }
    ],
    'update-credit-card-hold-reference': [
        { name: 'HOLD_REFERENCE_ID', label: 'HOLD_REFERENCE_ID', type: 'text', placeholder: 'e.g., 323454' },
        { name: 'CRM_CASE_ID', label: 'CRM_CASE_ID', type: 'text', placeholder: 'e.g., 645677867' },
        { name: 'CASE_ID', label: 'CASE_ID', type: 'text', placeholder: 'e.g., 645677867' }
    ]
};

function updateInputFields() {
    const action = document.getElementById('action').value;
    const inputFieldsContainer = document.getElementById('inputFields');
    inputFieldsContainer.innerHTML = '';

    if (!action) return;

    const fields = inputConfigs[action];
    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'input-group';

        const label = document.createElement('label');
        label.htmlFor = field.name;
        label.textContent = field.label;
        div.appendChild(label);

        if (field.type === 'select') {
            const select = document.createElement('select');
            select.id = field.name;
            select.name = field.name;

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = field.placeholder;
            select.appendChild(defaultOption);

            field.options.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                select.appendChild(option);
            });

            div.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.name;
            input.name = field.name;
            input.placeholder = field.placeholder;
            div.appendChild(input);
        }

        inputFieldsContainer.appendChild(div);
    });
}

function generateURL() {
    const action = document.getElementById('action').value;
    if (!action) return;

    const fields = inputConfigs[action];
    const queryParams = [];

    // Add fixed UNIT_ID=1 for delete-ping-id action
    if (action === 'delete-ping-id') {
        queryParams.push('UNIT_ID=1');
    }

    for (const field of fields) {
        const value = document.getElementById(field.name).value;
        if (!value) {
            alert(`Please fill in ${field.label}`);
            return;
        } else {
            queryParams.push(`${field.name}=${encodeURIComponent(value)}`);
        }
    }

    const url = `${baseURL}/job/${action}/job/parambuild/?env=prod&${queryParams.join('&')}`;
    document.getElementById('generatedURL').textContent = url;
    document.getElementById('copyBtn').style.display = 'block';
}

function copyURL() {
    const urlText = document.getElementById('generatedURL').textContent;
    if (!urlText) return;

    navigator.clipboard.writeText(urlText)
        .then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy URL');
        });
}
