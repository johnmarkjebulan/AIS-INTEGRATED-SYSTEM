export const create = async (profile) => {
    const transformedProfile = {
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        birthdate: profile.dob,
        address: profile.address,
        program: `${profile.course} ${profile.major}`.trim(),
        status: profile.status,
    };

    const response = await fetch('https://ais-simulated-legacy.onrender.com/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedProfile),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Legacy system request failed: ${response.status} ${text}`);
    }

    return await response.json();
};
