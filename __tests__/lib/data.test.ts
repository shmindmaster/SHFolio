import { getExperienceData, getProjectsData, getTestimonialsData } from '@/lib/data';

describe('Data Retrieval Functions', () => {
  describe('getExperienceData', () => {
    const data = getExperienceData();

    test('returns work experience array', () => {
      expect(Array.isArray(data.workExperience)).toBe(true);
      expect(data.workExperience.length).toBeGreaterThan(0);
    });

    test('work experience items have required properties', () => {
      data.workExperience.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('company');
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('achievements');
        expect(Array.isArray(item.achievements)).toBe(true);
      });
    });

    test('returns education array', () => {
      expect(Array.isArray(data.education)).toBe(true);
      expect(data.education.length).toBeGreaterThan(0);
    });

    test('education items have required properties', () => {
      data.education.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('degree');
        expect(item).toHaveProperty('institution');
        expect(item).toHaveProperty('period');
      });
    });
  });

  describe('getProjectsData', () => {
    const projects = getProjectsData();

    test('returns projects array', () => {
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    test('project items have required properties', () => {
      projects.forEach(project => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('technologies');
        expect(Array.isArray(project.technologies)).toBe(true);
      });
    });
  });

  describe('getTestimonialsData', () => {
    const testimonials = getTestimonialsData();

    test('returns testimonials array', () => {
      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.length).toBeGreaterThan(0);
    });

    test('testimonial items have required properties', () => {
      testimonials.forEach(testimonial => {
        expect(testimonial).toHaveProperty('id');
        expect(testimonial).toHaveProperty('name');
        expect(testimonial).toHaveProperty('role');
        expect(testimonial).toHaveProperty('company');
        expect(testimonial).toHaveProperty('content');
      });
    });
  });
});