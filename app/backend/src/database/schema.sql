CREATE TABLE IF NOT EXISTS vacancies (
    id SERIAL PRIMARY KEY,
    link_vacancy VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    resume_used VARCHAR(100),
    vacancy_level VARCHAR(50),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS links (
    id SERIAL PRIMARY KEY,
    vacancy_id INT REFERENCES vacancies(id) ON DELETE CASCADE,
    new_link VARCHAR(255) NOT NULL,
    original_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accessed_links (
    id SERIAL PRIMARY KEY,
    vacancy_id INT REFERENCES vacancies(id) ON DELETE CASCADE,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
