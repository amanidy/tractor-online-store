import {  NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    
    const recentActivities = await prisma.adminActivityLog.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: 10, 
      select: {
        id: true,
        type: true,
        description: true,
        timestamp: true,
      },
    });

    // Transform activities to match the frontend component's expected format
    const formattedActivities = recentActivities.map((activity) => {
      let icon, iconColor;

      switch (activity.type) {
        case "TRACTOR_LISTING_CREATED":
          icon = "TractorIcon";
          iconColor = "text-blue-500";
          break;
        case "TRACTOR_SOLD":
          icon = "DollarSign";
          iconColor = "text-green-500";
          break;
        case "QUALITY_ISSUE":
          icon = "AlertTriangle";
          iconColor = "text-yellow-500";
          break;
        default:
          icon = "AlertCircle";
          iconColor = "text-gray-500";
      }

      // Format timestamp to relative time
      const timestamp = formatRelativeTime(new Date(activity.timestamp));

      return {
        id: activity.id,
        type: activity.type,
        description: activity.description,
        timestamp,
        icon,
        iconColor,
      };
    });

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}

// Helper function to format timestamp to relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diffInSeconds < minute) {
    return "just now";
  } else if (diffInSeconds < hour) {
    const mins = Math.floor(diffInSeconds / minute);
    return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}
