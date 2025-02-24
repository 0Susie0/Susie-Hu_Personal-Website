// Portfolio.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Portfolio from './Components/Portfolio';

// 使用 Jest 的假定时器来控制自动轮播
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe('Portfolio Component 功能测试', () => {
  test('组件能正确渲染并显示标题和项目卡片', () => {
    render(<Portfolio />);
    
    // 检查是否存在 "Portfolio" 标题
    const heading = screen.getByText(/Portfolio/i);
    expect(heading).toBeInTheDocument();
    
    // 检查是否存在项目卡片，例如 "Project 1"
    const projectCard = screen.getByText(/Project 1/i);
    expect(projectCard).toBeInTheDocument();
  });

  test('自动轮播功能能正常工作', () => {
    render(<Portfolio />);
    
    // 初始时应该显示第一个项目卡片
    const initialProject = screen.getByText(/Project 1/i);
    expect(initialProject).toBeInTheDocument();

    // 模拟时间流逝，触发自动轮播（假设间隔为 3000ms）
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // 经过一次自动轮播后，应该切换到下一个项目
    // 这里假设第二个项目为 "Project 2"
    const secondProject = screen.getByText(/Project 2/i);
    expect(secondProject).toBeInTheDocument();
  });

  test('悬停导航能切换项目', () => {
    render(<Portfolio />);
    
    // 找到左右导航区域
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    expect(navLeft).toBeInTheDocument();
    expect(navRight).toBeInTheDocument();

    // 模拟鼠标悬停在右侧区域，切换到下一个项目
    act(() => {
      fireEvent.mouseEnter(navRight);
      // 模拟悬停延迟（例如 1000ms）
      jest.advanceTimersByTime(1000);
    });
    
    // 检查是否切换到了下一个项目（例如 "Project 2"）
    const nextProject = screen.getByText(/Project 2/i);
    expect(nextProject).toBeInTheDocument();

    // 模拟鼠标离开后自动轮播恢复
    act(() => {
      fireEvent.mouseLeave(navRight);
      jest.advanceTimersByTime(3000);
    });

    // 根据自动轮播逻辑，应该切换到后续项目
    const subsequentProject = screen.getByText(/Project 3/i);
    expect(subsequentProject).toBeInTheDocument();
  });
});

