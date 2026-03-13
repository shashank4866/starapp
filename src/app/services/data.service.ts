import { Injectable } from '@angular/core';
import { Capability, Achievement, CosmonautProfile } from '../models/capability.model';

@Injectable({ providedIn: 'root' })
export class DataService {

  getCapabilities(): Capability[] {
    return [
      {
        id: 'customer',
        name: 'Customer',
        icon: '🌍',
        color: '#00d4ff',
        glowColor: 'rgba(0,212,255,0.4)',
        description: 'Master the art of understanding and serving customers to create lasting value.',
        subCapabilities: [
          {
            id: 'customer-understanding',
            name: 'Customer Understanding',
            icon: '🔭',
            description: 'Deep dive into customer needs, behaviors, and motivations.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              {
                id: 'cu-trainee',
                name: 'Solution Trainee',
                order: 1,
                unlocked: true,
                completed: false,
                xpRequired: 0,
                tasks: [
                  { id: 't1', title: 'Map customer journey basics', description: 'Learn to create basic customer journey maps.', xp: 50, completed: false, type: 'theory' },
                  { id: 't2', title: 'Conduct 3 customer interviews', description: 'Interview customers and document insights.', xp: 75, completed: false, type: 'practice' },
                  { id: 't3', title: 'Build a customer persona', description: 'Create a detailed persona based on research.', xp: 50, completed: false, type: 'project' },
                ]
              },
              {
                id: 'cu-architect',
                name: 'Solution Architect',
                order: 2,
                unlocked: false,
                completed: false,
                xpRequired: 175,
                tasks: [
                  { id: 't4', title: 'Analyze behavioral data patterns', description: 'Use data to understand customer behavior at scale.', xp: 80, completed: false, type: 'practice' },
                  { id: 't5', title: 'Design empathy maps', description: 'Create empathy maps for 3 distinct customer segments.', xp: 70, completed: false, type: 'project' },
                  { id: 't6', title: 'Customer segmentation quiz', description: 'Test your knowledge on customer segmentation.', xp: 50, completed: false, type: 'quiz' },
                ]
              },
              {
                id: 'cu-lean',
                name: 'Solution Lean',
                order: 3,
                unlocked: false,
                completed: false,
                xpRequired: 375,
                tasks: [
                  { id: 't7', title: 'Build customer insight repository', description: 'Design a system to capture and share customer insights.', xp: 90, completed: false, type: 'project' },
                  { id: 't8', title: 'Predictive customer modeling', description: 'Use analytics to predict customer needs.', xp: 100, completed: false, type: 'practice' },
                ]
              },
              {
                id: 'cu-principal',
                name: 'Solution Principal',
                order: 4,
                unlocked: false,
                completed: false,
                xpRequired: 565,
                tasks: [
                  { id: 't9', title: 'Lead customer research program', description: 'Design and lead company-wide customer research.', xp: 120, completed: false, type: 'project' },
                  { id: 't10', title: 'Influence product roadmap', description: 'Drive product decisions through customer insights.', xp: 100, completed: false, type: 'practice' },
                ]
              },
              {
                id: 'cu-principal-arch',
                name: 'Solution Principal Architect',
                order: 5,
                unlocked: false,
                completed: false,
                xpRequired: 785,
                tasks: [
                  { id: 't11', title: 'Build customer-centric culture', description: 'Create org-wide frameworks for customer understanding.', xp: 150, completed: false, type: 'project' },
                  { id: 't12', title: 'Publish customer insights framework', description: 'Write and publish a reusable customer insights framework.', xp: 120, completed: false, type: 'project' },
                ]
              },
            ]
          },
          {
            id: 'customer-experience',
            name: 'Customer Experience',
            icon: '⭐',
            description: 'Design and deliver exceptional customer experiences.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'ce-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'ce-t1', title: 'Map touchpoints in a customer journey', description: 'Identify all key customer touchpoints.', xp: 50, completed: false, type: 'theory' },
                { id: 'ce-t2', title: 'Analyze 5 customer feedback reviews', description: 'Review and extract insights from customer feedback.', xp: 60, completed: false, type: 'practice' },
                { id: 'ce-t3', title: 'Prototype a CX improvement', description: 'Propose and prototype a small CX improvement.', xp: 65, completed: false, type: 'project' },
              ]},
              { id: 'ce-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 175, tasks: [
                { id: 'ce-t4', title: 'Define CX metrics', description: 'Identify and define KPIs for customer experience.', xp: 80, completed: false, type: 'practice' },
                { id: 'ce-t5', title: 'Conduct usability testing', description: 'Run usability tests and document findings.', xp: 90, completed: false, type: 'project' },
              ]},
              { id: 'ce-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 345, tasks: [
                { id: 'ce-t6', title: 'CX optimization strategy', description: 'Design a comprehensive CX optimization strategy.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'ce-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 445, tasks: [
                { id: 'ce-t7', title: 'Lead CX transformation', description: 'Lead a CX transformation initiative.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'ce-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 565, tasks: [
                { id: 'ce-t8', title: 'Define company CX standards', description: 'Establish company-wide CX standards and playbooks.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'customer-communication',
            name: 'Customer Communication',
            icon: '📡',
            description: 'Communicate effectively with customers across all channels.',
            totalXp: 450,
            earnedXp: 0,
            levels: [
              { id: 'cc-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'cc-t1', title: 'Master active listening', description: 'Practice and document active listening techniques.', xp: 50, completed: false, type: 'theory' },
                { id: 'cc-t2', title: 'Write 3 customer emails', description: 'Draft professional customer-facing emails.', xp: 60, completed: false, type: 'practice' },
              ]},
              { id: 'cc-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 110, tasks: [
                { id: 'cc-t3', title: 'Create communication templates', description: 'Build a library of communication templates.', xp: 80, completed: false, type: 'project' },
              ]},
              { id: 'cc-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 190, tasks: [
                { id: 'cc-t4', title: 'Design multi-channel communication', description: 'Develop a strategy for consistent multi-channel comms.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'cc-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 290, tasks: [
                { id: 'cc-t5', title: 'Lead communication training', description: 'Train team on effective customer communication.', xp: 110, completed: false, type: 'practice' },
              ]},
              { id: 'cc-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 400, tasks: [
                { id: 'cc-t6', title: 'Build communication center of excellence', description: 'Establish best practices org-wide.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'customer-problem-solving',
            name: 'Customer Problem Solving',
            icon: '🛸',
            description: 'Resolve customer challenges with innovative solutions.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'cps-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'cps-t1', title: 'Learn root cause analysis', description: 'Apply RCA to a customer complaint.', xp: 55, completed: false, type: 'theory' },
                { id: 'cps-t2', title: 'Resolve 5 customer issues', description: 'Document and resolve real customer issues.', xp: 70, completed: false, type: 'practice' },
              ]},
              { id: 'cps-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 125, tasks: [
                { id: 'cps-t3', title: 'Design problem escalation process', description: 'Build an effective escalation playbook.', xp: 90, completed: false, type: 'project' },
              ]},
              { id: 'cps-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 215, tasks: [
                { id: 'cps-t4', title: 'Systemic problem analysis', description: 'Identify systemic issues and propose long-term fixes.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'cps-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 315, tasks: [
                { id: 'cps-t5', title: 'Lead problem-solving workshops', description: 'Facilitate team workshops on problem-solving.', xp: 120, completed: false, type: 'practice' },
              ]},
              { id: 'cps-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 435, tasks: [
                { id: 'cps-t6', title: 'Innovate problem-solving frameworks', description: 'Create novel frameworks used company-wide.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'customer-value-creation',
            name: 'Customer Value Creation',
            icon: '💎',
            description: 'Create and deliver exceptional value for customers.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'cvc-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'cvc-t1', title: 'Understand value propositions', description: 'Study value proposition frameworks.', xp: 50, completed: false, type: 'theory' },
                { id: 'cvc-t2', title: 'Map value delivery for one product', description: 'Document how value is delivered.', xp: 65, completed: false, type: 'project' },
              ]},
              { id: 'cvc-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 115, tasks: [
                { id: 'cvc-t3', title: 'Design value-creation initiatives', description: 'Design 2 value-creation initiatives.', xp: 85, completed: false, type: 'project' },
              ]},
              { id: 'cvc-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 200, tasks: [
                { id: 'cvc-t4', title: 'Measure customer value ROI', description: 'Build metrics to measure customer value delivered.', xp: 100, completed: false, type: 'practice' },
              ]},
              { id: 'cvc-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 300, tasks: [
                { id: 'cvc-t5', title: 'Lead customer value strategy', description: 'Drive strategic customer value programs.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'cvc-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 420, tasks: [
                { id: 'cvc-t6', title: 'Define value creation architecture', description: 'Create an organization-wide value creation framework.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
        ]
      },
      {
        id: 'leadership',
        name: 'Leadership',
        icon: '🚀',
        color: '#a855f7',
        glowColor: 'rgba(168,85,247,0.4)',
        description: 'Develop powerful leadership capabilities to inspire and guide teams.',
        subCapabilities: [
          {
            id: 'team-collaboration',
            name: 'Team Collaboration',
            icon: '🌌',
            description: 'Build high-performing teams through effective collaboration.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'tc-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'tc-t1', title: 'Learn team dynamics models', description: 'Study Tuckman and other team models.', xp: 50, completed: false, type: 'theory' },
                { id: 'tc-t2', title: 'Facilitate a team retro', description: 'Run a retrospective session for your team.', xp: 70, completed: false, type: 'practice' },
                { id: 'tc-t3', title: 'Create team working agreements', description: 'Co-create team norms and agreements.', xp: 60, completed: false, type: 'project' },
              ]},
              { id: 'tc-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 180, tasks: [
                { id: 'tc-t4', title: 'Resolve team conflicts', description: 'Navigate and resolve a real team conflict.', xp: 90, completed: false, type: 'practice' },
                { id: 'tc-t5', title: 'Design collaboration processes', description: 'Design team processes that improve collaboration.', xp: 80, completed: false, type: 'project' },
              ]},
              { id: 'tc-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 350, tasks: [
                { id: 'tc-t6', title: 'Build cross-functional partnerships', description: 'Establish key cross-functional relationships.', xp: 100, completed: false, type: 'practice' },
              ]},
              { id: 'tc-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 450, tasks: [
                { id: 'tc-t7', title: 'Lead organizational collaboration', description: 'Drive collab initiatives across departments.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'tc-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 570, tasks: [
                { id: 'tc-t8', title: 'Define collaboration culture', description: 'Shape the culture of collaboration company-wide.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'decision-making',
            name: 'Decision Making',
            icon: '⚡',
            description: 'Make clear, data-driven decisions under pressure.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'dm-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'dm-t1', title: 'Study decision frameworks', description: 'Learn RAPID, DACI, and other frameworks.', xp: 50, completed: false, type: 'theory' },
                { id: 'dm-t2', title: 'Apply cost-benefit analysis', description: 'Apply CBA to a real decision.', xp: 65, completed: false, type: 'practice' },
              ]},
              { id: 'dm-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 115, tasks: [
                { id: 'dm-t3', title: 'Make data-driven decisions', description: 'Use data to support 3 key decisions.', xp: 85, completed: false, type: 'practice' },
              ]},
              { id: 'dm-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 200, tasks: [
                { id: 'dm-t4', title: 'Navigate ambiguous decisions', description: 'Decide effectively under high uncertainty.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'dm-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 300, tasks: [
                { id: 'dm-t5', title: 'Lead strategic decisions', description: 'Own major strategic decisions and document outcomes.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'dm-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 420, tasks: [
                { id: 'dm-t6', title: 'Define decision governance', description: 'Establish decision-making governance frameworks.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'strategic-thinking',
            name: 'Strategic Thinking',
            icon: '🪐',
            description: 'Think ahead and shape the future direction of your organization.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'st-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'st-t1', title: 'Understand strategy fundamentals', description: 'Study strategy frameworks like Porter and Blue Ocean.', xp: 55, completed: false, type: 'theory' },
                { id: 'st-t2', title: 'Analyze a competitor landscape', description: 'Conduct a competitive analysis.', xp: 65, completed: false, type: 'practice' },
              ]},
              { id: 'st-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 120, tasks: [
                { id: 'st-t3', title: 'Develop a team strategy', description: 'Create a 6-month strategy for your team.', xp: 90, completed: false, type: 'project' },
              ]},
              { id: 'st-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 210, tasks: [
                { id: 'st-t4', title: 'Design innovation roadmap', description: 'Build an innovation-focused team roadmap.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'st-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 310, tasks: [
                { id: 'st-t5', title: 'Lead division strategy', description: 'Own and drive division-level strategic plans.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'st-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 430, tasks: [
                { id: 'st-t6', title: 'Shape company-wide strategy', description: 'Contribute to and influence company strategy.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'conflict-management',
            name: 'Conflict Management',
            icon: '☄️',
            description: 'Turn conflicts into opportunities for growth and innovation.',
            totalXp: 450,
            earnedXp: 0,
            levels: [
              { id: 'cm-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'cm-t1', title: 'Study conflict resolution styles', description: 'Learn Thomas-Kilmann conflict modes.', xp: 50, completed: false, type: 'theory' },
                { id: 'cm-t2', title: 'Mediate a small dispute', description: 'Mediate a conflict between two peers.', xp: 70, completed: false, type: 'practice' },
              ]},
              { id: 'cm-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 120, tasks: [
                { id: 'cm-t3', title: 'Design conflict prevention processes', description: 'Create proactive conflict prevention mechanisms.', xp: 85, completed: false, type: 'project' },
              ]},
              { id: 'cm-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 205, tasks: [
                { id: 'cm-t4', title: 'Navigate cross-team conflicts', description: 'Resolve conflicts spanning multiple teams.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'cm-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 305, tasks: [
                { id: 'cm-t5', title: 'Train others in conflict resolution', description: 'Deliver conflict resolution training.', xp: 110, completed: false, type: 'practice' },
              ]},
              { id: 'cm-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 415, tasks: [
                { id: 'cm-t6', title: 'Define conflict governance policy', description: 'Establish org-wide conflict management policies.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'mentorship',
            name: 'Mentorship',
            icon: '🌟',
            description: 'Guide and grow the next generation of talent.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'men-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'men-t1', title: 'Study mentorship frameworks', description: 'Learn GROW and other coaching models.', xp: 50, completed: false, type: 'theory' },
                { id: 'men-t2', title: 'Mentor a peer for 1 month', description: 'Take on a mentee and document progress.', xp: 80, completed: false, type: 'practice' },
              ]},
              { id: 'men-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 130, tasks: [
                { id: 'men-t3', title: 'Create development plans', description: 'Build IDPs for at least 2 team members.', xp: 85, completed: false, type: 'project' },
              ]},
              { id: 'men-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 215, tasks: [
                { id: 'men-t4', title: 'Lead group mentorship sessions', description: 'Run group learning sessions.', xp: 100, completed: false, type: 'practice' },
              ]},
              { id: 'men-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 315, tasks: [
                { id: 'men-t5', title: 'Design mentorship program', description: 'Build a formal mentorship program.', xp: 120, completed: false, type: 'project' },
              ]},
              { id: 'men-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 435, tasks: [
                { id: 'men-t6', title: 'Scale mentorship culture', description: 'Establish mentorship as an organizational norm.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
        ]
      },
      {
        id: 'technology',
        name: 'Technology',
        icon: '⚙️',
        color: '#22c55e',
        glowColor: 'rgba(34,197,94,0.4)',
        description: 'Master cutting-edge technology to build the future.',
        subCapabilities: [
          {
            id: 'software-development',
            name: 'Software Development',
            icon: '💻',
            description: 'Write clean, scalable, and maintainable code.',
            totalXp: 550,
            earnedXp: 0,
            levels: [
              { id: 'sd-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'sd-t1', title: 'Master clean code principles', description: 'Apply SOLID principles in a project.', xp: 60, completed: false, type: 'theory' },
                { id: 'sd-t2', title: 'Build a REST API', description: 'Create a complete REST API with CRUD operations.', xp: 80, completed: false, type: 'project' },
                { id: 'sd-t3', title: 'Write unit tests for a module', description: 'Achieve 80%+ test coverage on a module.', xp: 70, completed: false, type: 'practice' },
              ]},
              { id: 'sd-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 210, tasks: [
                { id: 'sd-t4', title: 'Implement design patterns', description: 'Apply 5 GoF design patterns in real code.', xp: 90, completed: false, type: 'practice' },
                { id: 'sd-t5', title: 'Build a microservice', description: 'Develop a production-ready microservice.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'sd-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 400, tasks: [
                { id: 'sd-t6', title: 'Optimize system performance', description: 'Profile and optimize a slow application.', xp: 110, completed: false, type: 'practice' },
              ]},
              { id: 'sd-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 510, tasks: [
                { id: 'sd-t7', title: 'Lead technical architecture review', description: 'Conduct architecture reviews for a team.', xp: 130, completed: false, type: 'project' },
              ]},
              { id: 'sd-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 640, tasks: [
                { id: 'sd-t8', title: 'Define engineering standards', description: 'Set company-wide coding standards and practices.', xp: 160, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'architecture-design',
            name: 'Architecture Design',
            icon: '🏗️',
            description: 'Design robust, scalable system architectures.',
            totalXp: 550,
            earnedXp: 0,
            levels: [
              { id: 'ad-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'ad-t1', title: 'Understand microservices architecture', description: 'Study microservices patterns and tradeoffs.', xp: 50, completed: false, type: 'theory' },
                { id: 'ad-t2', title: 'Create system diagrams', description: 'Design C4 diagrams for a system.', xp: 60, completed: false, type: 'project' },
                { id: 'ad-t3', title: 'Evaluate architectural styles', description: 'Compare monolith vs microservices vs serverless.', xp: 55, completed: false, type: 'quiz' },
              ]},
              { id: 'ad-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 165, tasks: [
                { id: 'ad-t4', title: 'Design an event-driven system', description: 'Architect an event-driven application.', xp: 90, completed: false, type: 'project' },
                { id: 'ad-t5', title: 'Document ADRs', description: 'Write 5 Architecture Decision Records.', xp: 80, completed: false, type: 'practice' },
              ]},
              { id: 'ad-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 335, tasks: [
                { id: 'ad-t6', title: 'Design for high availability', description: 'Architect a highly available system.', xp: 110, completed: false, type: 'project' },
              ]},
              { id: 'ad-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 445, tasks: [
                { id: 'ad-t7', title: 'Lead architecture guild', description: 'Establish and lead an architecture community.', xp: 130, completed: false, type: 'project' },
              ]},
              { id: 'ad-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 575, tasks: [
                { id: 'ad-t8', title: 'Define enterprise architecture', description: 'Define and govern enterprise-wide architecture.', xp: 160, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'cloud-devops',
            name: 'Cloud & DevOps',
            icon: '☁️',
            description: 'Build and operate cloud-native, automated systems.',
            totalXp: 550,
            earnedXp: 0,
            levels: [
              { id: 'cd-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'cd-t1', title: 'Understand CI/CD pipelines', description: 'Study CI/CD concepts and tools.', xp: 55, completed: false, type: 'theory' },
                { id: 'cd-t2', title: 'Deploy an app to the cloud', description: 'Deploy a simple app to AWS/GCP/Azure.', xp: 80, completed: false, type: 'project' },
                { id: 'cd-t3', title: 'Set up Docker containers', description: 'Containerize an existing application.', xp: 70, completed: false, type: 'practice' },
              ]},
              { id: 'cd-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 205, tasks: [
                { id: 'cd-t4', title: 'Build a CI/CD pipeline', description: 'Create an automated pipeline from scratch.', xp: 95, completed: false, type: 'project' },
                { id: 'cd-t5', title: 'Implement Infrastructure as Code', description: 'Use Terraform or Pulumi to manage infra.', xp: 100, completed: false, type: 'project' },
              ]},
              { id: 'cd-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 400, tasks: [
                { id: 'cd-t6', title: 'Design cloud cost optimization', description: 'Reduce cloud costs by 20% through optimization.', xp: 110, completed: false, type: 'project' },
              ]},
              { id: 'cd-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 510, tasks: [
                { id: 'cd-t7', title: 'Lead DevOps transformation', description: 'Drive DevOps adoption across teams.', xp: 130, completed: false, type: 'project' },
              ]},
              { id: 'cd-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 640, tasks: [
                { id: 'cd-t8', title: 'Define cloud strategy', description: 'Set the cloud strategy for the organization.', xp: 160, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'security',
            name: 'Security',
            icon: '🛡️',
            description: 'Protect systems and data with world-class security practices.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'sec-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'sec-t1', title: 'Learn OWASP Top 10', description: 'Study and apply OWASP security practices.', xp: 60, completed: false, type: 'theory' },
                { id: 'sec-t2', title: 'Perform a security audit', description: 'Audit an application for common vulnerabilities.', xp: 75, completed: false, type: 'practice' },
              ]},
              { id: 'sec-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 135, tasks: [
                { id: 'sec-t3', title: 'Design secure authentication', description: 'Implement OAuth 2.0 and MFA.', xp: 95, completed: false, type: 'project' },
              ]},
              { id: 'sec-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 230, tasks: [
                { id: 'sec-t4', title: 'Implement threat modeling', description: 'Conduct STRIDE threat modeling for a system.', xp: 110, completed: false, type: 'project' },
              ]},
              { id: 'sec-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 340, tasks: [
                { id: 'sec-t5', title: 'Lead security training', description: 'Deliver security awareness training for teams.', xp: 120, completed: false, type: 'practice' },
              ]},
              { id: 'sec-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 460, tasks: [
                { id: 'sec-t6', title: 'Define security governance', description: 'Establish security policies and governance.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
          {
            id: 'innovation',
            name: 'Innovation',
            icon: '🔮',
            description: 'Drive breakthrough innovation through creative thinking.',
            totalXp: 500,
            earnedXp: 0,
            levels: [
              { id: 'inn-trainee', name: 'Solution Trainee', order: 1, unlocked: true, completed: false, xpRequired: 0, tasks: [
                { id: 'inn-t1', title: 'Study design thinking', description: 'Apply Design Thinking to a real problem.', xp: 55, completed: false, type: 'theory' },
                { id: 'inn-t2', title: 'Run an ideation workshop', description: 'Facilitate a brainstorming session with your team.', xp: 70, completed: false, type: 'practice' },
              ]},
              { id: 'inn-architect', name: 'Solution Architect', order: 2, unlocked: false, completed: false, xpRequired: 125, tasks: [
                { id: 'inn-t3', title: 'Prototype an innovation concept', description: 'Build a low-fidelity prototype for a new idea.', xp: 90, completed: false, type: 'project' },
              ]},
              { id: 'inn-lean', name: 'Solution Lean', order: 3, unlocked: false, completed: false, xpRequired: 215, tasks: [
                { id: 'inn-t4', title: 'Run an innovation experiment', description: 'Design and run an A/B or innovation experiment.', xp: 110, completed: false, type: 'project' },
              ]},
              { id: 'inn-principal', name: 'Solution Principal', order: 4, unlocked: false, completed: false, xpRequired: 325, tasks: [
                { id: 'inn-t5', title: 'Lead an innovation lab', description: 'Own an innovation lab or hackathon.', xp: 130, completed: false, type: 'project' },
              ]},
              { id: 'inn-principal-arch', name: 'Solution Principal Architect', order: 5, unlocked: false, completed: false, xpRequired: 455, tasks: [
                { id: 'inn-t6', title: 'Drive innovation strategy', description: 'Set the innovation agenda for the organization.', xp: 150, completed: false, type: 'project' },
              ]},
            ]
          },
        ]
      },
    ];
  }

  getAchievements(): Achievement[] {
    return [
      { id: 'first-task', title: 'First Launch', description: 'Complete your very first task', icon: '🚀', unlocked: false, xpReward: 100 },
      { id: 'speed-demon', title: 'Speed Demon', description: 'Complete 3 tasks in one day', icon: '⚡', unlocked: false, xpReward: 150 },
      { id: 'level-up', title: 'Level Up!', description: 'Unlock your first new career level', icon: '⬆️', unlocked: false, xpReward: 200 },
      { id: 'explorer', title: 'Galaxy Explorer', description: 'Visit all three capability galaxies', icon: '🌌', unlocked: false, xpReward: 125 },
      { id: 'streak-3', title: '3-Day Streak', description: 'Maintain a 3-day learning streak', icon: '🔥', unlocked: false, xpReward: 100 },
      { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day learning streak', icon: '⭐', unlocked: false, xpReward: 300 },
      { id: 'centurion', title: 'Centurion', description: 'Earn 1000 total XP', icon: '💯', unlocked: false, xpReward: 250 },
      { id: 'tech-master', title: 'Tech Pioneer', description: 'Complete all Technology trainee tasks', icon: '⚙️', unlocked: false, xpReward: 500 },
      { id: 'team-player', title: 'Team Player', description: 'Complete all Leadership trainee tasks', icon: '🤝', unlocked: false, xpReward: 500 },
      { id: 'customer-hero', title: 'Customer Hero', description: 'Complete all Customer trainee tasks', icon: '🌍', unlocked: false, xpReward: 500 },
      { id: 'task-10', title: 'Task Master', description: 'Complete 10 tasks total', icon: '✅', unlocked: false, xpReward: 200 },
      { id: 'all-rounder', title: 'All-Rounder', description: 'Complete at least one task in each galaxy', icon: '🎯', unlocked: false, xpReward: 300 },
    ];
  }

  getProfile(): CosmonautProfile {
    return {
      id: 'cosmonaut-001',
      name: 'Alex Cosmos',
      title: 'Junior Cosmonaut',
      avatar: '👨‍🚀',
      totalXp: 0,
      level: 1,
      streak: 5,
      joinDate: new Date('2024-01-15'),
      achievements: []
    };
  }
}
