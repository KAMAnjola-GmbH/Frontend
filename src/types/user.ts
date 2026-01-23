// src/types/user.ts

/**
 * Basic user information from JWT claims.
 */
export interface UserInfo {
    userId: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
}

/**
 * Business KPIs aggregated from all products.
 */
export interface BusinessKpis {
    totalProjects: number;
    projectsThisWeek: number;
    completedAnalyses: number;
    analysesThisWeek: number;
    simulationRuns: number;
    simulationsThisWeek: number;
    activeAlerts: number;
}

/**
 * Summary for each product in the platform.
 */
export interface ProductSummary {
    productId: string;
    name: string;
    description: string;
    icon: string;
    itemCount: number;
    status: 'active' | 'coming_soon';
    url: string;
}

/**
 * Single activity item in the timeline.
 */
export interface ActivityItem {
    type: 'upload' | 'analysis_complete' | 'simulation' | string;
    productId: string;
    title: string;
    description?: string;
    timestamp: string;
    projectId?: number;
    projectUrl?: string;
}

/**
 * User subscription information.
 */
export interface Subscription {
    plan: 'Free' | 'Professional' | 'Enterprise';
    validUntil?: string;
    projectsLimit: number;
    projectsUsed: number;
    storageUsedMb: number;
    storageLimitMb: number;
}

/**
 * Main dashboard response containing all aggregated user data.
 */
export interface DashboardData {
    user: UserInfo;
    kpis: BusinessKpis;
    products: ProductSummary[];
    recentActivity: ActivityItem[];
    subscription: Subscription;
}
