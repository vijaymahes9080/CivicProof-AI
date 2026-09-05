export type Language = 'en' | 'ta';

export interface Citation {
  source_id: string;
  source_title: string;
  source_url: string;
  department: string;
  state: string;
  exact_quote: string;
  page_number?: number;
  section_title?: string;
  confidence: number;
}

export interface AssistantResponse {
  answer: string;
  citations: Citation[];
  confidence_score: number;
  evidence_found: boolean;
  missing_information: string[];
  suggested_actions: string[];
  risk_flags: string[];
  plain_language_summary?: string;
  language: Language;
}

export interface CitizenProfile {
  state_of_domicile: string;
  category: string;
  gender: string;
  annual_family_income: number;
  education_level: string;
  course_stream?: string;
  previous_exam_percentage: number;
  is_differently_abled: boolean;
  is_first_graduate: boolean;
  govt_school_studied_class_6_to_12: boolean;
}

export interface EvaluatedRule {
  rule_id: string;
  rule_description: string;
  clause_reference: string;
  is_passed: boolean;
  citizen_value: any;
  required_condition: string;
  reason: string;
}

export interface EligibilityResult {
  scheme_id: string;
  scheme_name: string;
  scheme_name_ta?: string;
  status: 'ELIGIBLE' | 'INELIGIBLE' | 'PARTIALLY_ELIGIBLE_NEEDS_DOCS' | 'UNCERTAIN';
  match_percentage: number;
  passed_rules: EvaluatedRule[];
  failed_rules: EvaluatedRule[];
  pending_verifications: string[];
  official_portal_url: string;
  citations: Citation[];
}

export interface DocumentRequirement {
  document_name: string;
  document_name_ta?: string;
  type: 'REQUIRED' | 'CONDITIONAL' | 'OPTIONAL';
  rationale: string;
  issuing_authority: string;
  source_citation: string;
  needs_human_confirmation: boolean;
  validity_guidelines?: string;
  sample_url?: string;
}

export interface ChecklistResult {
  scheme_id: string;
  scheme_name: string;
  required_documents: DocumentRequirement[];
  conditional_documents: DocumentRequirement[];
  optional_documents: DocumentRequirement[];
  total_count: number;
  notes: string[];
}

export interface SchemeSummary {
  id: string;
  slug: string;
  title_en: string;
  title_ta?: string;
  department: string;
  state: string;
  funding_type: string;
  official_portal_url: string;
  max_amount?: string;
  description_en: string;
  description_ta?: string;
}

export interface SourceSummary {
  id: string;
  url: string;
  domain: string;
  title: string;
  department: string;
  state: string;
  language: string;
  publication_date?: string;
  effective_date?: string;
  last_checked_date: string;
  content_hash: string;
  trust_status: string;
  version_num: number;
}
